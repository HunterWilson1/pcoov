import React, { useState } from "react";
import { oliveOilsData } from "../data/Oo";

const Quiz = () => {
  const [answers, setAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);

  const questions = [
    {
      text: 'Are you looking for an Olive Oil or Balsamic',
      options: [
        { answer: 'Olive Oil', tags: ['oliveOil'] },
        { answer: 'Balsamic', tags: ['balsamic'] },
      ],
    },
    {
      text: 'What taste profile are you looking for?',
      options: [
        { answer: 'Earthy', tags: ['earthy'] },
        { answer: 'Tart', tags: ['tart'] },
        { answer: 'Herbaceous', tags: ['herbaceous']}
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
    // Count the occurrences of each tag in answers
    const tagCounts = answers.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
  
    // Find the most common tag
    const mostCommonTag = Object.keys(tagCounts).reduce((a, b) => (tagCounts[a] > tagCounts[b] ? a : b));
  
    // Get all matching olive oils based on the most common tag
    const matchingOliveOils = oliveOilsData.filter(oil => oil.tags.includes(mostCommonTag));
  
    // Find the olive oil with the most corresponding tags
    let mostMatchingOliveOil = null;
    let mostMatches = 0;
  
    matchingOliveOils.forEach(oil => {
      const currentMatches = oil.tags.filter(tag => answers.includes(tag)).length;
      if (currentMatches > mostMatches) {
        mostMatchingOliveOil = oil;
        mostMatches = currentMatches;
      }
    });
  
    // Display only the item with the most corresponding tags
    const result = {
      oliveOils: mostMatchingOliveOil,
    };
  
    setResult(result);
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
                    className="mb-2 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded" // Add margin-bottom for spacing
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;