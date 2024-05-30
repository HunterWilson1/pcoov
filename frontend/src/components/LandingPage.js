import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import olivebackground from "../assets/olive.webp";
import balsamicbackground from "../assets/balsamic.webp";
import "./ToggleSwitch.css";

const LandingPage = () => {
  const [isOliveOilQuiz, setIsOliveOilQuiz] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleQuizType = () => {
    setIsOliveOilQuiz(!isOliveOilQuiz);
  };

  const backgroundStyle = {
    transition: "background-image 0.5s ease-in-out",
    backgroundImage: `url(${isOliveOilQuiz ? olivebackground : balsamicbackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const quizLink = isOliveOilQuiz ? "/olive-oil-quiz" : "/balsamic-quiz";
  const themeColor = isOliveOilQuiz ? "bg-green-800" : "bg-pink-800";
  const buttonColor = isOliveOilQuiz ? "bg-lime-500 hover:bg-lime-600" : "bg-pink-500 hover:bg-pink-600";
  const textColor = isOliveOilQuiz ? "text-green-700" : "text-pink-700";
  const headerText = isOliveOilQuiz ? "Find Your Olive Oil" : "Find Your Balsamic";
  const mainTitleText = isOliveOilQuiz ? "Olive Oil Quiz" : "Balsamic Quiz";

  return (
    <div
      style={backgroundStyle}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <header className={`w-full ${themeColor} text-white py-4 shadow-md z-20`}>
        <nav className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold">{headerText}</div>
          </div>
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

      <div className="bg-white rounded-lg shadow-md text-center relative mt-auto mb-auto mx-auto p-6" style={{ maxWidth: '600px', width: '90%' }}>
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mt-6 mb-4 ${textColor}`}>
          {mainTitleText}
        </h1>
        <p className="text-base sm:text-lg mb-6">
          Discover which type of olive oil and vinegar best suits your taste preferences!
        </p>
        <div className="toggle-switch mb-6">
          <input type="checkbox" id="toggle" className="toggle-checkbox" onClick={toggleQuizType} checked={isOliveOilQuiz} readOnly />
          <label className="toggle-label" htmlFor="toggle">
            <span className="toggle-inner" />
            <span className="toggle-switch" />
          </label>
        </div>
        <Link to={quizLink} className="block w-full text-center">
          <button
            className={`mx-auto ${buttonColor} text-white px-4 py-2 rounded shadow-lg transform transition duration-300 ease-in-out hover:scale-105`}
            style={{ maxWidth: '250px' }}
          >
            {isOliveOilQuiz ? "Start Olive Oil Quiz" : "Start Balsamic Quiz"}
          </button>
        </Link>
      </div>

      <footer className={`w-full ${themeColor} text-white py-4 shadow-md z-20`}>
        <div className="container mx-auto text-center">
          &copy; 2024 Olive Oil & Vinegar Quiz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
