import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const BalsamicQuiz = () => {
  const questions = [
    {
      text: "Would you like a red or white Balsamic?",
      options: [
        { answer: "Red", tags: ["red"] },
        { answer: "White", tags: ["white"] },
        { answer: "Wine", tags: ["wine"] },
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
    fetch(`http://localhost:3001/api/balsamics?tags=${encodeURIComponent(tagsQuery)}`)
      .then(response => response.ok ? response.json() : Promise.reject(`HTTP error! status: ${response.status}`))
      .then(data => {
        console.log("Fetched data:", data);  // Log fetched data
        if (data.balsamics && data.balsamics.length > 0) {
          calculateResult(finalTags, data.balsamics);
        } else {
          throw new Error("No valid data found based on selected tags");
        }
      })
      .catch(error => {
        console.error("Fetch error:", error); // Log any error
        setError(`Failed to fetch balsamics: ${error.message}`);
        setLoading(false);
      });
  };

  const calculateResult = (finalTags, balsamicData) => {
    let bestMatch = null;
    let highestScore = 0;

    balsamicData.forEach((balsamic) => {
      const balsamicTags = balsamic.tags.split(', '); // Split the tags string into an array
      const matchScore = balsamicTags.filter(tag => finalTags.includes(tag)).length;
      if (matchScore > highestScore) {
        bestMatch = balsamic;
        highestScore = matchScore;
      }
    });

    if (bestMatch) {
      setResult(bestMatch);
      console.log("Best match:", bestMatch); // Log the best match
      navigate('/results', { state: { result: bestMatch } }); // Navigate with state
    } else {
      setError("No matching balsamics found.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md flex flex-col items-center justify-center w-full max-w-lg">
        {loading ? (
          <div>Loading results...</div>
        ) : error ? (
          <div>Error loading the quiz: {error}</div>
        ) : questionIndex < questions.length ? (
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
          <div>No results found.</div>
        )}
      </div>
    </div>
  );
};

export default BalsamicQuiz;