'use client';

import React from 'react';

interface QuestionProps {
  question: {
    question: string;
    all_answers: string[];
  };
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
}

export default function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer,
}: QuestionProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="mb-2 text-lg font-semibold">
        Question {questionNumber} of {totalQuestions}
      </h2>
      <p className="mb-4">{decodeHtml(question.question)}</p>
      <div className="space-y-2">
        {question.all_answers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(answer)}
            className={`w-full p-2 border rounded ${
              selectedAnswer === answer ? 'bg-blue-200' : 'bg-gray-100'
            }`}
          >
            {decodeHtml(answer)}
          </button>
        ))}
      </div>
    </div>
  );
}

function decodeHtml(html: string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
