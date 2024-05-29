import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import oliveBackground from "../assets/olive.webp"; // Ensure the path is correct
import balsamicBackground from "../assets/balsamic.webp"; // Ensure the path is correct

const ResultPage = () => {
  const location = useLocation();
  const { result, quizType } = location.state || {};
  const isOliveQuiz = quizType === "olive";

  const backgroundStyle = {
    backgroundImage: `url(${isOliveQuiz ? oliveBackground : balsamicBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const [isOpen, setIsOpen] = useState(false);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">No result found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center" style={backgroundStyle}>
      <header className={`w-full ${isOliveQuiz ? "bg-green-800" : "bg-purple-800"} text-white py-4 shadow-md relative z-20`}>
        <nav className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold">Olive Oil & Vinegar Quiz</div>
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
        <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-lg bg-opacity-90">
          <h3 className={`text-xl font-semibold mb-4 ${isOliveQuiz ? "text-green-700" : "text-purple-700"}`}>
            Recommended {isOliveQuiz ? "Olive Oil" : "Balsamic"}
          </h3>
          <img src={result.image} alt={result.name} className="w-full max-w-sm h-auto rounded-md object-contain mb-4" />
          <h4 className="text-lg font-semibold">{result.name}</h4>
          <p>{result.description}</p>
          {result.pairings && result.pairings.length > 0 && (
            <>
              <h5 className="text-lg font-semibold mt-4">Pairs well with:</h5>
              <ul className="list-disc list-inside">
                {result.pairings.map((pairing, index) => (
                  <li key={index}>{pairing}</li>
                ))}
              </ul>
            </>
          )}
          <Link
            to="/"
            className={`mt-4 ${isOliveQuiz ? "bg-green-500 hover:bg-green-600" : "bg-purple-500 hover:bg-purple-600"} text-white px-4 py-2 rounded shadow-lg`}
          >
            Back to Home
          </Link>
        </div>
      </div>

      <footer className={`w-full ${isOliveQuiz ? "bg-green-800" : "bg-purple-800"} text-white py-4 shadow-md relative z-20`}>
        <div className="container mx-auto text-center">
          &copy; 2024 Olive Oil & Vinegar Quiz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ResultPage;