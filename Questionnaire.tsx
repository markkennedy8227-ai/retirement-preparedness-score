
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { Answer, QuestionOption } from '../types';
import ProgressBar from './ProgressBar';
import { CheckIcon } from './icons/CheckIcon';

interface QuestionnaireProps {
  onAnswerSubmit: (answer: Answer) => void;
  onComplete: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onAnswerSubmit, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuestionOption | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  const handleOptionSelect = (option: QuestionOption) => {
    setSelectedOption(option);
    
    setTimeout(() => {
      const answer: Answer = {
        questionId: currentQuestion.id,
        questionText: currentQuestion.text,
        answerText: option.text,
        score: option.score,
      };
      onAnswerSubmit(answer);
      
      setIsAnimating(true);
      setTimeout(() => {
          if (currentQuestionIndex < QUESTIONS.length - 1) {
              setCurrentQuestionIndex(prev => prev + 1);
              setSelectedOption(null);
          } else {
              onComplete();
          }
          setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const progress = ((currentQuestionIndex) / QUESTIONS.length) * 100;

  return (
    <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <ProgressBar progress={progress} />
      <div className="mt-6 animate-slide-in-up">
        <p className="text-slate-500 text-sm font-medium">Question {currentQuestionIndex + 1} of {QUESTIONS.length}</p>
        <h2 className="text-xl font-semibold text-slate-800 my-4">{currentQuestion.text}</h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`w-full text-left p-4 border rounded-lg transition-all duration-200 flex items-center justify-between
                ${selectedOption === option ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-slate-300 hover:border-blue-400 hover:bg-blue-50'}`}
            >
              <span>{option.text}</span>
              {selectedOption === option && <CheckIcon className="w-5 h-5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
