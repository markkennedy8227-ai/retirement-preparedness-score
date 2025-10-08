
import React, { useState, useEffect, useCallback } from 'react';
import { Answer, UserData } from '../types';
import { generateRetirementReport } from '../services/geminiService';

interface ScoreCircleProps {
    score: number;
    maxScore: number;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score, maxScore }) => {
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    const circumference = 2 * Math.PI * 50;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    let scoreColor = 'text-green-500';
    let ringColor = 'stroke-green-500';
    if (percentage < 40) {
        scoreColor = 'text-red-500';
        ringColor = 'stroke-red-500';
    } else if (percentage < 70) {
        scoreColor = 'text-yellow-500';
        ringColor = 'stroke-yellow-500';
    }

    return (
        <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle className="stroke-slate-200" strokeWidth="10" fill="transparent" r="50" cx="60" cy="60" />
                <circle
                    className={`transform -rotate-90 origin-center transition-all duration-1000 ease-out ${ringColor}`}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    r="50"
                    cx="60"
                    cy="60"
                />
            </svg>
            <div className={`absolute inset-0 flex flex-col items-center justify-center ${scoreColor}`}>
                <span className="text-5xl font-bold">{score}</span>
                <span className="text-lg">/ {maxScore}</span>
            </div>
        </div>
    );
};


interface ResultsProps {
  score: number;
  maxScore: number;
  answers: Answer[];
  userData: UserData;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, maxScore, answers, userData, onRestart }) => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [showAppointment, setShowAppointment] = useState(false);

  const getScoreAnalysis = (score: number, maxScore: number): { title: string; description: string } => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 70) {
      return { title: "Well Prepared!", description: "You're on a solid path to a secure retirement. Let's optimize it." };
    } else if (percentage >= 40) {
      return { title: "On The Right Track", description: "You have a good foundation, but there are key areas to improve." };
    } else {
      return { title: "Needs Attention", description: "It's time to take action and build a stronger retirement plan." };
    }
  };
  
  const analysis = getScoreAnalysis(score, maxScore);

  const fetchReport = useCallback(async () => {
    try {
      setStatus('loading');
      await generateRetirementReport(answers, score, maxScore, userData);
      setStatus('success');
    } catch (error) {
      console.error("Error generating report:", error);
      setStatus('error');
    }
  }, [answers, score, maxScore, userData]);

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="text-center animate-fade-in">
        {status === 'loading' && (
            <div>
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h2 className="text-2xl font-bold text-slate-800 mt-6">Generating Your Report...</h2>
                <p className="text-slate-600 mt-2">Our AI is analyzing your answers to create a personalized plan.</p>
            </div>
        )}

        {status === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">Something went wrong while generating your report. Please try again.</span>
                <button onClick={onRestart} className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
                    Try Again
                </button>
            </div>
        )}

        {status === 'success' && (
            <div className="animate-slide-in-up">
                <h2 className="text-3xl font-bold text-slate-800">{analysis.title}</h2>
                <p className="text-slate-600 mt-2">{analysis.description}</p>
                <div className="my-8 flex justify-center">
                    <ScoreCircle score={score} maxScore={maxScore} />
                </div>
                <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg text-center mb-6">
                    <p className="font-semibold">Success! Your detailed preparedness report has been sent to {userData.email}.</p>
                </div>

                {!showAppointment ? (
                    <div className="bg-slate-100 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-slate-800">Ready to Improve Your Score?</h3>
                        <p className="text-slate-600 my-3">A personalized strategy can make your retirement plan more efficient and effective. Would you like to see how?</p>
                        <button onClick={() => setShowAppointment(true)} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
                            Yes, Show Me How
                        </button>
                    </div>
                ) : (
                    <div className="bg-blue-100 p-6 rounded-lg border border-blue-300 animate-fade-in">
                        <h3 className="text-xl font-bold text-blue-800">Take the Next Step</h3>
                        <p className="text-blue-700 my-3">Schedule a complimentary, no-obligation consultation with a certified financial advisor to build your tailored retirement roadmap.</p>
                        <a href="https://calendly.com/your-scheduling-link" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105">
                            Schedule My Appointment
                        </a>
                    </div>
                )}

                <button onClick={onRestart} className="mt-8 text-slate-500 hover:text-slate-700 font-medium">
                    Take the Assessment Again
                </button>
            </div>
        )}
    </div>
  );
};

export default Results;
