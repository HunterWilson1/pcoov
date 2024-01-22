import React, { useState } from "react";
import { oliveOilsData } from "../data/Oo";
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [answers, setAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };


  const questions = [
    {
        text: 'Are you looking for an Olive Oil or Balsamic?',
        options: [
            { answer: 'Olive Oil', tags: ['oliveOil'] },
            { answer: 'Balsamic', tags: ['balsamic'] },
        ],
    },
    {
        text: 'Which flavor profile do you prefer?',
        options: [
            { answer: 'Herbaceous & Aromatic', tags: ['herbaceous', 'aromatic'] },
            { answer: 'Citrus & Zesty', tags: ['citrus', 'zesty'] },
            { answer: 'Earthy & Savory', tags: ['earthy', 'savory'] },
            { answer: 'Spicy & Bold', tags: ['spicy', 'bold'] },
            { answer: 'Rich & Smooth', tags: ['rich', 'smooth'] },
        ],
    },
    {
        text: 'What is your primary use for the olive oil?',
        options: [
            { answer: 'Cooking', tags: ['cooking'] },
            { answer: 'Dressing Salads', tags: ['dressing', 'salads'] },
            { answer: 'Dipping & Marinades', tags: ['dipping', 'marinades'] },
            { answer: 'Baking', tags: ['baking'] },
            { answer: 'General Versatility', tags: ['versatile'] },
        ],
    },
    {
        text: 'Select your preferred intensity',
        options: [
            { answer: 'Mild', tags: ['mild'] },
            { answer: 'Medium', tags: ['medium'] },
            { answer: 'Strong', tags: ['strong'] },
        ],
    },
    {
        text: 'Do you have a preference for specific regional flavors?',
        options: [
            { answer: 'Italian', tags: ['Italian'] },
            { answer: 'Mediterranean', tags: ['Mediterranean'] },
            { answer: 'Asian', tags: ['Asian'] },
            { answer: 'Mexican', tags: ['Mexican'] },
            { answer: 'French', tags: ['French'] },
            { answer: 'No Specific Preference', tags: [] },
        ],
    },
];

  const handleAnswer = (selectedTags) => {
    setAnswers([...answers, ...selectedTags]);
    setQuestionIndex(questionIndex + 1);

    if (questionIndex === questions.length - 1) {
      calculateResult();
    }
  };

  const calculateResult = () => {
    const tagCounts = answers.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    const mostCommonTag = Object.keys(tagCounts).reduce((a, b) => (tagCounts[a] > tagCounts[b] ? a : b));

    const matchingOliveOils = oliveOilsData.filter(oil => oil.tags.includes(mostCommonTag));

    let mostMatchingOliveOil = null;
    let mostMatches = 0;

    matchingOliveOils.forEach(oil => {
      const currentMatches = oil.tags.filter(tag => answers.includes(tag)).length;
      if (currentMatches > mostMatches) {
        mostMatchingOliveOil = oil;
        mostMatches = currentMatches;
      }
    });

    setResult({
      oliveOils: mostMatchingOliveOil,
    });
  };

  const resetQuiz = () => {
    setAnswers([]);
    setQuestionIndex(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lime-900">
      <div className="bg-lime-100 p-8 rounded-lg flex flex-col items-center justify-center">
        {questionIndex < questions.length ? (
          <div>
            <h3 className="mb-4">{questions[questionIndex].text}</h3>
            <ul>
              {questions[questionIndex].options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <button
                    onClick={() => handleAnswer(option.tags)}
                    className="mb-2 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded"
                  >
                    {option.answer}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h3>Quiz Completed!</h3>
            {result && (
              <div>
                <h4>Matching Olive Oils:</h4>
                <ul>
                  {Array.isArray(result.oliveOils) ? (
                    result.oliveOils.map((oil, index) => (
                      <li key={index}>{oil.name}</li>
                    ))
                  ) : (
                    <li>{result.oliveOils && result.oliveOils.name}</li>
                  )}
                </ul>
              </div>
            )}
            <button
              onClick={resetQuiz}
              className="mt-4 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded"
            >
              Restart Quiz
            </button>
            <button
        onClick={goToHomePage}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to Home Page
      </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
