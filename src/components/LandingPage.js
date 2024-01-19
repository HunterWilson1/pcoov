// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lime-900">
      <div className="bg-lime-100 p-8 rounded-lg flex flex-col items-center justify-center">
        <h1 className="text-black text-2xl mb-4">
          Find your Olive Oil or Vinegar
        </h1>
        <h2>
            *insert description here*
        </h2>
          <button className="flex items-center justify-center bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded">
            Start
          </button>

      </div>
    </div>
  );
};

export default LandingPage;
