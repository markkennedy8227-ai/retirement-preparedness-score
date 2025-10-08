
import React, { useState, useMemo } from 'react';
import Welcome from './components/Welcome';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import { UserData, Answer } from './types';
import { QUESTIONS } from './constants';

type AppStep = 'welcome' | 'questionnaire' | 'results';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('welcome');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const startQuiz = (data: UserData) => {
    setUserData(data);
    setStep('questionnaire');
  };

  const submitAnswer = (answer: Answer) => {
    setAnswers(prev => [...prev, answer]);
  };
  
  const completeQuiz = () => {
    setStep('results');
  };

  const restartQuiz = () => {
    setAnswers([]);
    setUserData(null);
    setStep('welcome');
  };

  const totalScore = useMemo(() => {
    return answers.reduce((acc, answer) => acc + answer.score, 0);
  }, [answers]);

  const maxScore = useMemo(() => {
    return QUESTIONS.reduce((acc, q) => acc + Math.max(...q.options.map(o => o.score)), 0);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Retirement Preparedness</h1>
          <p className="text-slate-600 mt-2">How ready are you for your golden years?</p>
        </header>
        <main className="bg-white rounded-xl shadow-lg p-8 transition-all duration-500">
          {step === 'welcome' && <Welcome onStart={startQuiz} />}
          {step === 'questionnaire' && 
            <Questionnaire 
              onAnswerSubmit={submitAnswer} 
              onComplete={completeQuiz}
            />
          }
          {step === 'results' && userData && 
            <Results 
              score={totalScore} 
              maxScore={maxScore} 
              answers={answers}
              userData={userData}
              onRestart={restartQuiz} 
            />
          }
        </main>
        <footer className="text-center mt-8 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} FutureSecure Financials. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
