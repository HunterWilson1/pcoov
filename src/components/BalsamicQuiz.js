import React, { useState } from "react";
import { balsamicData } from "../data/Balsamic"; // Ensure this data file exists and is structured correctly
import { useNavigate } from 'react-router-dom';
import grapeBackground from '../images/grape.webp'; // Import your grape background image

const BalsamicQuiz = () => {
  const [answers, setAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  };
  const questions = [
    {
      text: 'Which flavor profile do you prefer for Balsamic?',
      options: [
        { answer: 'Sweet & Fruity', tags: ['sweet', 'fruity'] },
        { answer: 'Rich & Complex', tags: ['rich', 'complex'] },
        { answer: 'Tart & Tangy', tags: ['tart', 'tangy'] },
      ],
    },
    {
      text: 'What is your primary use for the Balsamic?',
      options: [
        { answer: 'Dressing Salads', tags: ['dressing', 'salads'] },
        { answer: 'Marinades', tags: ['marinades'] },
        { answer: 'Reductions', tags: ['reductions'] },
        { answer: 'Desserts', tags: ['desserts'] },
      ],
    },
    {
      text: 'Do you prefer a specific origin for Balsamic?',
      options: [
        { answer: 'Traditional Italian', tags: ['Italian'] },
        { answer: 'Modern Varieties', tags: ['modern'] },
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

    const matchingBalsamics = balsamicData.filter(balsamic => balsamic.tags.includes(mostCommonTag));

    let mostMatchingBalsamic = null;
    let mostMatches = 0;

    matchingBalsamics.forEach(balsamic => {
      const currentMatches = balsamic.tags.filter(tag => answers.includes(tag)).length;
      if (currentMatches > mostMatches) {
        mostMatchingBalsamic = balsamic;
        mostMatches = currentMatches;
      }
    });

    setResult({
      balsamics: mostMatchingBalsamic,
    });
  };

  const resetQuiz = () => {
    setAnswers([]);
    setQuestionIndex(0);
    setResult(null);
  };

  return (
    <div 
      style={{ backgroundImage: `url(${grapeBackground})`, backgroundSize: 'cover' }} 
      className="min-h-screen flex items-center justify-center"
    >
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center">
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
                <h4>Matching Balsamics:</h4>
                <ul>
                  {Array.isArray(result.balsamics) ? (
                    result.balsamics.map((balsamic, index) => (
                      <li key={index}>{balsamic.name}</li>
                    ))
                  ) : (
                    <li>{result.balsamics && result.balsamics.name}</li>
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

export default BalsamicQuiz;
