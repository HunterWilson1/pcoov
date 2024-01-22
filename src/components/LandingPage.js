import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isOliveOilQuiz, setIsOliveOilQuiz] = useState(true);

  const toggleQuizType = () => {
    setIsOliveOilQuiz(!isOliveOilQuiz);
  };

  const bgColor = isOliveOilQuiz ? "bg-lime-900" : "bg-purple-900";
  const buttonColor = isOliveOilQuiz ? "bg-lime-500 hover:bg-lime-600" : "bg-purple-500 hover:bg-purple-600";
  const quizLink = isOliveOilQuiz ? "/olive-oil-quiz" : "/balsamic-quiz";

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor} transition-colors duration-500`}>
      <div className="bg-lime-100 p-8 rounded-lg flex flex-col items-center justify-center">
        <h1 className="text-black text-2xl mb-4">
          Find your Olive Oil or Vinegar
        </h1>
        <h2>
          *insert description here*
        </h2>
        <button onClick={toggleQuizType} className="mb-4 bg-gray-200 px-4 py-2 rounded">
          Switch to {isOliveOilQuiz ? "Balsamic" : "Olive Oil"} Quiz
        </button>
        <Link to={quizLink}>
          <button className={`flex items-center justify-center ${buttonColor} text-white px-4 py-2 rounded`}>
            Start
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
