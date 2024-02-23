import React, { useState } from "react";
import { balsamicData } from "../data/Balsamic"; // Ensure this data file exists and is structured correctly
import { useNavigate } from "react-router-dom";
import grapeBackground from "../images/grape.webp"; // Import your grape background image

const BalsamicQuiz = () => {
  const [answers, setAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };
  const questions = [
    {
      text: "Would you like a red or white Balsamic?",
      options: [
        { answer: "Red", tags: ["red"] },
        { answer: "White", tags: ["white"] },
      ],
    },
    {
      text: "Which flavor profile do you prefer for Balsamic?",
      options: [
        { answer: "Sweet & Fruity", tags: ["sweet", "fruity"] },
        { answer: "Rich & Complex", tags: ["rich", "complex"] },
        { answer: "Tart & Tangy", tags: ["tart", "tangy"] },
      ],
    },
    {
      text: "Choose the intensity of the Balsamic you prefer:",
      options: [
        { answer: "Mild & Delicate", tags: ["mild"] },
        { answer: "Medium & Balanced", tags: ["medium"] },
        { answer: "Bold & Strong", tags: ["bold"] },
      ],
    },
    {
      text: "What is your primary use for the Balsamic?",
      options: [
        { answer: "Dressing Salads", tags: ["dressing", "salads"] },
        { answer: "Marinades", tags: ["marinades"] },
        { answer: "Reductions", tags: ["reductions"] },
        { answer: "Desserts", tags: ["desserts"] },
      ],
    },
    {
      text: "Do you prefer a specific origin for Balsamic?",
      options: [
        { answer: "Traditional Italian", tags: ["Italian"] },
        { answer: "Modern Varieties", tags: ["modern"] },
        { answer: "No Specific Preference", tags: [] },
      ],
    },
    {
      text: "Do you have a preference for the age of the Balsamic?",
      options: [
        { answer: "Young and Zesty", tags: ["young"] },
        { answer: "Aged and Mellow", tags: ["aged"] },
        { answer: "No Specific Preference", tags: [] },
      ],
    },
    {
      text: "Which pairing do you prefer with Balsamic?",
      options: [
        { answer: "Cheese and Fruits", tags: ["cheese", "fruits"] },
        { answer: "Grilled Meats", tags: ["grilled", "meats"] },
        { answer: "Vegetables and Salads", tags: ["vegetables", "salads"] },
        { answer: "Desserts and Sweets", tags: ["desserts", "sweets"] },
        { answer: "No Specific Preference", tags: [] },
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

    const matchingBalsamics = balsamicData.filter((balsamic) =>
      balsamic.tags.includes(mostCommonTag)
    );

    let mostMatchingBalsamic = null;
    let mostMatches = 0;

    matchingBalsamics.forEach((balsamic) => {
      const currentMatches = balsamic.tags.filter((tag) =>
        answers.includes(tag)
      ).length;
      if (currentMatches > mostMatches) {
        mostMatchingBalsamic = balsamic;
        mostMatches = currentMatches;
      }
    });

    setResult({
      balsamics: mostMatchingBalsamic,
    });
  };

  const containerStyle = {
    maxWidth: "600px", // Set a max width for larger screens
    width: "90%", // Use a percentage for smaller screens to keep it responsive
    height: "auto", // Adjust height automatically based on content
    minHeight: "500px", // Minimum height to keep a decent size on all devices
  };

  const backgroundStyle = {
    backgroundImage: `url(${grapeBackground})`,
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[questionIndex].options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswer(option.tags)}
                  className="mb-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                >
                  {option.answer}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
            {result.balsamics && (
              <div className="space-y-4">
                <div className="inline-block max-w-xs w-full">
                  {" "}
                  {/* Constrain the size of the image */}
                  <img
                    src={result.balsamics.image}
                    alt={result.balsamics.name}
                    className="object-contain w-full h-auto rounded-md" // object-contain to ensure the image is contained within the div
                  />
                </div>
                <h4 className="text-lg font-semibold">Recommended Balsamic:</h4>
                <p className="font-bold">{result.balsamics.name}</p>
                <p>{result.balsamics.description}</p>
                {result.balsamics.pairings && (
                  <div>
                    <h5 className="text-lg font-semibold mt-4">
                      Pairs well with:
                    </h5>
                    <ul className="list-disc list-inside">
                      {result.balsamics.pairings.map((pairing, index) => (
                        <li key={index}>{pairing}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={goToHomePage}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
            >
              ← Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalsamicQuiz;
