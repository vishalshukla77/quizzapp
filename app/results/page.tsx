'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface Question {
  question: string;
  correct_answer: string;
}

interface QuizResults {
  userAnswers: string[];
  questions: Question[];
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResults | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('quizResults');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        parsed.userAnswers = Array.isArray(parsed.userAnswers) ? parsed.userAnswers : [];
        parsed.questions = Array.isArray(parsed.questions) ? parsed.questions : [];
        setResults(parsed as QuizResults);
      } catch {
        setResults(null);
      }
    }
  }, []);

  if (!results) {
    return <p className="p-4 text-center text-gray-500">No results found.</p>;
  }

  const correctCount = results.userAnswers.filter(
    (ans: string, i: number) => ans === results.questions[i]?.correct_answer
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Quiz Results
        </h1>
        <div className="text-center mb-6">
          <p className="text-xl font-semibold">
            You got <span className="text-green-600">{correctCount}</span> /{" "}
            {results.questions.length} correct!
          </p>
        </div>

        {results.questions.map((q: Question, idx: number) => {
          const userAnswer = results.userAnswers[idx];
          const isCorrect = userAnswer === q.correct_answer;

          return (
            <div
              key={idx}
              className={`mb-4 p-4 rounded-lg shadow-sm ${
                isCorrect ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <p className="font-semibold mb-2">{decodeHtml(q.question)}</p>
              <p className="flex items-center">
                {isCorrect ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                ) : (
                  <XCircleIcon className="w-5 h-5 text-red-500 mr-2" />
                )}
                Your Answer:{" "}
                <span
                  className={`ml-1 ${
                    isCorrect ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {decodeHtml(userAnswer || 'Not answered')}
                </span>
              </p>
              {!isCorrect && (
                <p className="mt-1 text-sm text-gray-600">
                  Correct Answer: {decodeHtml(q.correct_answer)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function decodeHtml(html: string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}
