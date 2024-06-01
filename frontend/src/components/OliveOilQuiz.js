import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import oliveBackground from "../assets/olive.webp"; // Ensure the path is correct

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

  const [isOpen, setIsOpen] = useState(false);

  const backgroundStyle = {
    backgroundImage: `url(${oliveBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      style={backgroundStyle}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <header className="w-full bg-green-800 text-white py-4 shadow-md z-20">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold">Find Your Olive Oil</div>
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

      <footer className="w-full bg-green-800 text-white py-4 shadow-md z-20">
        <div className="container mx-auto text-center">
          &copy; 2024 Find Your Olive Oil. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default OliveOilQuiz;
