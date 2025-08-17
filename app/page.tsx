import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Quiz App</h1>
      <p className="text-xl mb-12 max-w-2xl">
        Test your knowledge with our 15-question quiz. You&apos;ll have 30 minutes to complete all questions.
      </p>
      <Link 
        href="/start" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors"
      >
        Start Quiz
      </Link>
    </div>
  );
}
