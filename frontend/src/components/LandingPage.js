import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import oliveBackground from '../images/olive.png';
import grapeBackground from '../images/grape.webp';
import './ToggleSwitch.css'; // Make sure to create this CSS file

const LandingPage = () => {
  const [isOliveOilQuiz, setIsOliveOilQuiz] = useState(true);

  const toggleQuizType = () => {
    setIsOliveOilQuiz(!isOliveOilQuiz);
  };

  const containerStyle = {
    maxWidth: '600px', // Set a max width for larger screens
    width: '90%', // Use a percentage for smaller screens to keep it responsive
    height: 'auto', // Adjust height automatically based on content
    minHeight: '500px', // Minimum height to keep a decent size on all devices
  };

  const backgroundStyle = {
    backgroundImage: `url(${isOliveOilQuiz ? oliveBackground : grapeBackground})`,
    transition: 'background-image 0.5s ease-in-out', // Smooth transition for background change
    backgroundSize: 'cover', // Ensure background covers the div completely
    backgroundPosition: 'center', // Center the background image
  };

  const quizLink = isOliveOilQuiz ? "/olive-oil-quiz" : "/balsamic-quiz";

  return (
    <div style={backgroundStyle} className="min-h-screen flex items-center justify-center">
      <div style={containerStyle} className="bg-white bg-opacity-90 p-8 rounded-lg flex flex-col items-center justify-center shadow-md">
        <h1 className="text-black text-2xl mb-4 font-bold text-center">Find Your Olive Oil or Vinegar</h1>
        <p className="text-center mb-4">
          Welcome to Pass Christian Olive Oil & Vinegar, your culinary guide to finding the perfect olive oil and vinegar amidst a sea of choices. Our mission is to simplify your journey through our extensive collection, offering personalized recommendations that cater to your taste preferences and cooking needs. Whether you're a seasoned chef or a curious food enthusiast, our platform is designed to help you navigate the diverse world of flavors with ease, ensuring a delightful experience as you discover the ideal products to elevate your culinary creations. Explore with us and transform your cooking into an adventure of taste.
        </p>
        <h2 className='pb-2 text-center font-bold'>
          This will switch between the Olive Oil quiz and the Balsamic quiz
        </h2>
        <div className="toggle-switch">
          <input type="checkbox" id="toggle" className="toggle-checkbox" onClick={toggleQuizType} checked={isOliveOilQuiz} readOnly />
          <label className="toggle-label" htmlFor="toggle">
            <span className="toggle-inner" />
            <span className="toggle-switch" />
          </label>
        </div>
        <Link to={quizLink} className="w-full">
          <button className={`mt-4 w-full ${isOliveOilQuiz ? "bg-lime-500 hover:bg-lime-600" : "bg-purple-500 hover:bg-purple-600"} text-white px-4 py-2 rounded`}>
            Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
