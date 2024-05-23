import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OliveOilQuiz = () => {
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

  const [answers, setAnswers] = useState([]);
  const [oliveOilData, setOliveOilData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  const handleAnswer = (selectedTags) => {
    const updatedAnswers = [...answers, ...selectedTags];
    setAnswers(updatedAnswers);
    console.log("Updated Answers:", updatedAnswers); // Debugging log

    if (questionIndex + 1 === questions.length) {
      // All questions answered, fetch data and calculate result
      setLoading(true);
      fetchDataAndCalculateResult(updatedAnswers);
    } else {
      setQuestionIndex(questionIndex + 1); // Go to next question
    }
  };

  const fetchDataAndCalculateResult = (finalTags) => {
    fetch("http://localhost:3001/api/olive_oils")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched olive oil data:", data); // Debugging log
        if (data && Array.isArray(data) && data.length > 0) {
          setOliveOilData(data);
          calculateResult(finalTags, data);
        } else {
          throw new Error("No valid data found");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch olive oils:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  const calculateResult = (finalTags, oliveOilData) => {
    console.log("Calculating results for tags:", finalTags); // Log the final tags used for calculation

    // Function to calculate the number of matching tags
    const getMatchScore = (oilTags) => {
      return oilTags.reduce((score, tag) => (finalTags.includes(tag) ? score + 1 : score), 0);
    };

    // Find the olive oil with the highest match score
    let bestMatch = null;
    let highestScore = 0;

    oliveOilData.forEach((oil) => {
      const matchScore = getMatchScore(oil.tags);
      if (matchScore > highestScore) {
        bestMatch = oil;
        highestScore = matchScore;
      }
    });

    if (bestMatch) {
      setResult(bestMatch);
      console.log("Best Match:", bestMatch.name); // Log the best match found
    } else {
      console.log("No matching olive oil found.");
      setResult(null);
    }
    setLoading(false);
  };

  // Debug to check state values
  console.log({
    questionIndex,
    questionsLength: questions.length,
    result,
    loading,
    error,
  });

  const containerStyle = {
    maxWidth: "600px",
    width: "90%",
    height: "auto",
    minHeight: "500px",
  };

  const backgroundStyle = {

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
                  className="mb-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  {option.answer}
                </button>
              ))}
            </div>
          </div>
        ) : loading ? (
          <div>Loading results...</div>
        ) : error ? (
          <div>Error loading the quiz: {error}</div>
        ) : result ? (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
            <div className="space-y-4">
              {result.image && (
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-full h-auto rounded-md object-contain"
                />
              )}
              <h4 className="text-lg font-semibold">Recommended Olive Oil:</h4>
              <p className="font-bold">{result.name}</p>
              <p>{result.description}</p>
              {result.pairings && (
                <div>
                  <h5 className="text-lg font-semibold mt-4">Pairs well with:</h5>
                  <ul className="list-disc list-inside">
                    {result.pairings.map((pairing, index) => (
                      <li key={index}>{pairing}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={goToHomePage}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
            >
              ← Back to Home
            </button>
          </div>
        ) : (
          <div>No results found.</div>
        )}
      </div>
    </div>
  );
};

export default OliveOilQuiz;
