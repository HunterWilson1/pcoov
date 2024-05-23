import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import grapeBackground from "../images/grape.webp";

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

  // Initialize state
  const [answers, setAnswers] = useState([]);
  const [balsamicData, setBalsamicData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset state on component mount
    setAnswers([]);
    setQuestionIndex(0);
    setResult(null);
    setError(false);
    setLoading(true);

    // Fetch data
    fetch("https://hunterwilson1.github.io/VF-API/data/balsamics.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.balsamics) {
        setBalsamicData(data.balsamics);
      } else {
        throw new Error("No valid data found");
      }
    })
    .catch((error) => {
      console.error("Failed to fetch balsamics:", error);
      setError(true);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  const goToHomePage = () => {
    navigate("/");
  };

  const handleAnswer = (selectedTags) => {
    const updatedAnswers = [...answers, ...selectedTags];
    setAnswers(updatedAnswers);
    console.log("Updated Answers:", updatedAnswers); // Debugging log

    if (questionIndex + 1 === questions.length) {
      calculateResult(updatedAnswers);
      setQuestionIndex(questionIndex + 1); // Move to the results screen
    } else {
      setQuestionIndex(questionIndex + 1); // Go to next question
    }
  };

  const calculateResult = (finalTags) => {
    if (!balsamicData || balsamicData.length === 0) {
      console.error("Balsamic data is not loaded yet or is empty.");
      return; // Ensure data is available
    }

    console.log("Calculating results for tags:", finalTags); // Log the final tags used for calculation

    // Start with all balsamics and narrow down
    let possibleMatches = balsamicData;

    // Apply a must-match filter for critical types like 'red', 'white', 'wine'
    const criticalTags = ["red", "white", "wine"];
    const criticalUserTags = finalTags.filter((tag) =>
      criticalTags.includes(tag)
    );

    if (criticalUserTags.length > 0) {
      possibleMatches = possibleMatches.filter((balsamic) =>
        criticalUserTags.every((ctag) => balsamic.tags.includes(ctag))
      );
    }

    // If there are still too many options, try to match additional tags
    if (
      possibleMatches.length > 1 &&
      finalTags.length > criticalUserTags.length
    ) {
      const secondaryTags = finalTags.filter(
        (tag) => !criticalTags.includes(tag)
      );
      let secondaryMatches = possibleMatches.filter((balsamic) =>
        secondaryTags.some((stag) => balsamic.tags.includes(stag))
      );

      if (secondaryMatches.length > 0) {
        possibleMatches = secondaryMatches;
      }
    }

    // Select the best match or report no matches
    if (possibleMatches.length > 0) {
      setResult(possibleMatches[0]); // You can choose to refine how you pick the best match
      console.log("Best Match:", possibleMatches[0].name); // Log the best match found
    } else {
      console.log("No matching balsamic found.");
      setResult(null);
    }
  };

  // Debug to check state values
  console.log({
    questionIndex,
    questionsLength: questions.length,
    result,
  });

  // Render logic
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading the quiz.</div>;

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
        ) : result ? (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
            <div className="space-y-4">
            {result.image && (
              <img src={result.image} alt={result.name} className="w-full h-auto rounded-md object-contain" />
            )}
              <h4 className="text-lg font-semibold">Recommended Balsamic:</h4>
              <p className="font-bold">{result.name}</p>
              <p>{result.description}</p>
              {result.pairings && (
                <div>
                  <h5 className="text-lg font-semibold mt-4">
                    Pairs well with:
                  </h5>
                  <ul className="list-disc list-inside">
                    {result.pairings.map((pairing, index) => (
                      <li key={index}>{pairing}</li>
                    ))}
                  </ul>
                </div>
              )}
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
