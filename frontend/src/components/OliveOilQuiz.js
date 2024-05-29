import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import oliveBackground from "../assets/olive.webp"; // Ensure the path is correct
import balsamicBackground from "../assets/balsamic.webp"; // Ensure the path is correct

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
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const goToHomePage = () => navigate("/");

  const handleAnswer = (selectedTags) => {
    const updatedAnswers = [...answers, ...selectedTags];
    setAnswers(updatedAnswers);
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setLoading(true);
      setError(null);
      fetchDataAndCalculateResult(updatedAnswers);
    }
  };

  const fetchDataAndCalculateResult = (finalTags) => {
    const tagsQuery = finalTags.join(',');
    fetch(`http://localhost:3001/api/olive_oils?tags=${encodeURIComponent(tagsQuery)}`)
      .then(response => response.ok ? response.json() : Promise.reject(`HTTP error! status: ${response.status}`))
      .then(data => {
        console.log("Fetched data:", data);  // Log fetched data
        if (data.olive_oils.length > 0) {
          calculateResult(finalTags, data.olive_oils);
        } else {
          throw new Error("No valid data found based on selected tags");
        }
      })
      .catch(error => {
        console.error("Fetch error:", error); // Log any error
        setError(`Failed to fetch olive oils: ${error.message}`);
        setLoading(false);
      });
  };

  const calculateResult = (finalTags, oliveOilData) => {
    let bestMatch = null;
    let highestScore = 0;

    oliveOilData.forEach((oil) => {
      const oilTags = oil.tags.split(', '); // Split the tags string into an array
      const matchScore = oilTags.filter(tag => finalTags.includes(tag)).length;
      if (matchScore > highestScore) {
        bestMatch = oil;
        highestScore = matchScore;
      }
    });

    if (bestMatch) {
      setResult(bestMatch);
      console.log("Best match:", bestMatch); // Log the best match
      navigate('/olive-result', { state: { result: bestMatch } });
    } else {
      setError("No matching olive oils found.");
    }
    setLoading(false);
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-green-50" style={{ backgroundImage: `url(${oliveBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md flex flex-col items-center justify-center w-full max-w-lg">
        {loading ? (
          <div className="text-green-700 text-lg font-bold">Loading results...</div>
        ) : error ? (
          <div className="text-red-500 text-lg font-bold">Error loading the quiz: {error}</div>
        ) : questionIndex < questions.length ? (
          <div className="text-center">
            <h3 className="mb-6 text-2xl font-bold text-green-700">{questions[questionIndex].text}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[questionIndex].options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswer(option.tags)}
                  className="mb-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-md transition"
                >
                  {option.answer}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-green-700 text-lg font-bold">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default OliveOilQuiz;
