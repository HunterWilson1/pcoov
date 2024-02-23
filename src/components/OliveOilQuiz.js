import React, { useState } from "react";
import { oliveOilsData } from "../data/Oo";
import { useNavigate } from "react-router-dom";
import oliveBackground from "../images/olive.png";

const OOQuiz = () => {
  const [answers, setAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  const questions = [
    {
      text: "Which flavor profile do you prefer?",
      options: [
        { answer: "Herbaceous", tags: ["herbaceous"] },
        { answer: "Citrus", tags: ["citrus"] },
        { answer: "Earthy", tags: ["earthy"] },
        { answer: "Spicy", tags: ["spicy"] },
        { answer: "Smooth", tags: ["smooth"] },
        { answer: "Zesty", tags: ["zesty"] },
        { answer: "Savory", tags: ["savory"] },
        { answer: "Smoky", tags: ["smoky"] },
        { answer: "Bold", tags: ["bold"] },
      ],
    },
    {
      text: "What is your primary use for the olive oil?",
      options: [
        { answer: "Cooking", tags: ["cooking"] },
        { answer: "Dressing Salads", tags: ["dressing", "salads"] },
        { answer: "Dipping", tags: ["dipping"] },
        { answer: "Marinades", tags: ["marinades"] },
        { answer: "Baking", tags: ["baking"] },
        { answer: "General Versatility", tags: ["versatile"] },
      ],
    },
    {
      text: "Select your preferred intensity",
      options: [
        { answer: "Mild", tags: ["mild"] },
        { answer: "Medium", tags: ["medium"] },
        { answer: "Strong", tags: ["strong"] },
      ],
    },
    {
      text: "Do you have a preference for specific regional flavors?",
      options: [
        { answer: "Italian", tags: ["Italian"] },
        { answer: "Mediterranean", tags: ["Mediterranean"] },
        { answer: "Asian", tags: ["Asian"] },
        { answer: "Mexican", tags: ["Mexican"] },
        { answer: "French", tags: ["French"] },
        { answer: "No Specific Preference", tags: ["general"] },
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

    const mostCommonTag = Object.keys(tagCounts).reduce((a, b) =>
      tagCounts[a] > tagCounts[b] ? a : b
    );

    const matchingOliveOils = oliveOilsData.filter((oil) =>
      oil.tags.includes(mostCommonTag)
    );

    let mostMatchingOliveOil = null;
    let mostMatches = 0;

    matchingOliveOils.forEach((oil) => {
      const currentMatches = oil.tags.filter((tag) =>
        answers.includes(tag)
      ).length;
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

  const containerStyle = {
    maxWidth: "600px", // Set a max width for larger screens
    width: "90%", // Use a percentage for smaller screens to keep it responsive
    height: "auto", // Adjust height automatically based on content
    minHeight: "500px", // Minimum height to keep a decent size on all devices
  };

  const backgroundStyle = {
    backgroundImage: `url(${oliveBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      style={backgroundStyle}
      className="min-h-screen flex items-center justify-center"
    >
      <div
        style={containerStyle}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md flex flex-col items-center justify-center w-full max-w-lg"
      >
        {questionIndex < questions.length ? (
          <div>
            <h3 className="mb-4">{questions[questionIndex].text}</h3>
            {/* Use grid layout for buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[questionIndex].options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswer(option.tags)}
                  className="mt-4 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded"
                >
                  {option.answer}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
            {result.oliveOils && (
              <div className="space-y-4">
                <div className="inline-block max-w-xs w-full">
                  {" "}
                  {/* Constrain the size of the image */}
                  <img
                    src={result.oliveOils.image}
                    alt={result.oliveOils.name}
                    className="object-contain w-full h-auto rounded-md" // object-contain to ensure the image is contained within the div
                  />
                </div>
                <h4 className="text-lg font-semibold">
                  Recommended Olive Oil:
                </h4>
                <p className="font-bold">{result.oliveOils.name}</p>
                <p>{result.oliveOils.description}</p>
                {result.oliveOils.pairings && (
                  <div>
                    <h5 className="text-lg font-semibold mt-4">
                      Pairs well with:
                    </h5>
                    <ul className="list-disc list-inside">
                      {result.oliveOils.pairings.map((pairing, index) => (
                        <li key={index}>{pairing}</li>
                      ))}
                    </ul>
                  </div>
                )}
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

export default OOQuiz;
