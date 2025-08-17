'use client';

import React, { useEffect, useState } from 'react';
import QuestionDisplay from '@/components/QuestionDisplay';
import QuestionNavigation from '@/components/QuestionNavigation';
import Timer from '@/components/Timer';
import { useRouter } from 'next/navigation';

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

interface ApiQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [visitedQuestions, setVisitedQuestions] = useState<number[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const router = useRouter();

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=15')
      .then(res => res.json())
      .then(data => {
        const formatted: Question[] = data.results.map((q: ApiQuestion) => ({
          ...q,
          all_answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
        }));
        setQuestions(formatted);
      });
  }, []);

  const shuffleArray = (array: string[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions(prev => [...prev, currentQuestion]);
    }
  };

  const handleQuestionChange = (index: number) => {
    if (!visitedQuestions.includes(index)) {
      setVisitedQuestions(prev => [...prev, index]);
    }
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    localStorage.setItem('quizResults', JSON.stringify({ questions, userAnswers }));
    router.push('/results');
  };

  if (questions.length === 0) {
    return <p className="p-4">Loading quiz...</p>;
  }

  return (
    <div className="p-4 grid md:grid-cols-4 gap-4">
      <div className="md:col-span-3">
        <Timer duration={1800} onTimeUp={handleSubmit} />
        <QuestionDisplay
          question={questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          selectedAnswer={userAnswers[currentQuestion]}
        />
        <div className="mt-4">
          {currentQuestion > 0 && (
            <button
              onClick={() => handleQuestionChange(currentQuestion - 1)}
              className="px-4 py-2 bg-gray-300 rounded mr-2"
            >
              Previous
            </button>
          )}
          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={() => handleQuestionChange(currentQuestion + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div>
        <QuestionNavigation
          totalQuestions={questions.length}
          currentQuestionIndex={currentQuestion}
          setCurrentQuestionIndex={handleQuestionChange}
          userAnswers={answeredQuestions}
          visited={visitedQuestions}
        />
      </div>
    </div>
  );
}
