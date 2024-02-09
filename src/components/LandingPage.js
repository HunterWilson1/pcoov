import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import oliveBackground from '../images/olive.png';
import grapeBackground from '../images/grape.webp';

const LandingPage = () => {
  const [isOliveOilQuiz, setIsOliveOilQuiz] = useState(true);

  const toggleQuizType = () => {
    setIsOliveOilQuiz(!isOliveOilQuiz);
  };

  const backgroundStyle = {
    backgroundImage: `url(${isOliveOilQuiz ? oliveBackground : grapeBackground})`,
    transition: 'background-image 0.5s ease-in-out' // Add transition effect
  };

  const buttonColor = isOliveOilQuiz ? "bg-lime-500 hover:bg-lime-600" : "bg-purple-500 hover:bg-purple-600";
  const quizLink = isOliveOilQuiz ? "/olive-oil-quiz" : "/balsamic-quiz";

  return (
    <div style={backgroundStyle} className="min-h-screen flex items-center justify-center bg-cover">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg flex flex-col items-center justify-center shadow-md">
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
