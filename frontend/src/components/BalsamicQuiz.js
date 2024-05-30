import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import balsamicBackground from "../assets/balsamic.webp"; // Ensure the path is correct

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
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
      navigate('/balsamic-result', { state: { result: bestMatch } });
    } else {
      setError("No matching balsamics found.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundImage: `url(${balsamicBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <header className="w-full bg-pink-800 text-white py-4 shadow-md relative z-20">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold">Find Your Balsamic</div>
          <div className="hidden md:flex">
            <Link to="/#home" className="mx-2">
              Home
            </Link>
            <Link to="/about" className="mx-2">
              About
            </Link>
            <Link to="/contact" className="mx-2">
              Contact
            </Link>
          </div>
          <div className="md:hidden relative">
            <Menu as="div" className="relative">
              <Menu.Button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Menu.Button>
              <Menu.Items
                className={`${isOpen ? "block" : "hidden"} absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30`}
              >
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/#home"
                      className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                    >
                      Home
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/about"
                      className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                    >
                      About
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/contact"
                      className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
                    >
                      Contact
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </nav>
      </header>

      <div className="flex-grow flex items-center justify-center w-full">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md flex flex-col items-center justify-center w-full max-w-lg">
          {loading ? (
            <div className="text-pink-800 text-lg font-bold">Loading results...</div>
          ) : error ? (
            <div className="text-red-500 text-lg font-bold">Error loading the quiz: {error}</div>
          ) : questionIndex < questions.length ? (
            <div className="text-center">
              <h3 className="mb-6 text-2xl font-bold text-pink-800">{questions[questionIndex].text}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[questionIndex].options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswer(option.tags)}
                    className="mb-2 bg-pink-800 hover:bg-pink-900 text-white px-4 py-2 rounded-full shadow-md transition"
                  >
                    {option.answer}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-purple-700 text-lg font-bold">No results found.</div>
          )}
        </div>
      </div>

      <footer className="w-full bg-pink-800 text-white py-4 shadow-md relative z-20">
        <div className="container mx-auto text-center">
          &copy; 2024 Olive Oil & Vinegar Quiz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BalsamicQuiz;
