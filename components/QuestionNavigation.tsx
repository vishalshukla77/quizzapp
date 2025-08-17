'use client';

import React from 'react';

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  userAnswers?: number[];
  visited?: number[];
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  totalQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  userAnswers = [],
  visited = [],
}) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="mb-2 font-semibold">Question Overview</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isAnswered = userAnswers.includes(index);
          const isVisited = visited.includes(index);

          return (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`p-2 rounded text-sm ${
                index === currentQuestionIndex
                  ? 'ring-2 ring-blue-500'
                  : isAnswered
                  ? 'bg-green-300'
                  : isVisited
                  ? 'bg-yellow-300'
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionNavigation;
