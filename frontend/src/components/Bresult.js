import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import balsamicBackground from "../assets/balsamic.webp"; // Ensure the path is correct

const BalsamicResultPage = () => {
  const location = useLocation();
  const { result } = location.state || {};

  const backgroundStyle = {
    backgroundImage: `url(${balsamicBackground})`,
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
      <header className="w-full bg-pink-800 text-white py-4 shadow-md relative z-20">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-bold">Find your Balsamic!</div>
          <div className="hidden md:flex">
            <Link to="/" className="mx-2">
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
                      to="/"
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

      <div className="flex-grow flex items-center justify-center w-full pt-16">
  <div className="bg-white p-12 rounded-lg shadow-2xl text-center w-full max-w-3xl bg-opacity-90">
    <h3 className="text-3xl font-extrabold mb-6 text-pink-800">
      Recommended Balsamic
    </h3>
    <h4 className="text-2xl font-semibold mb-4">{result.name}</h4>
    <p className="text-lg mb-6">{result.description}</p>
    {result.pairings && result.pairings.length > 0 && (
      <>
        <h5 className="text-xl font-semibold mt-6">Pairs well with:</h5>
        <ul className="list-disc list-inside text-left text-lg mx-auto mb-6 max-w-md">
          {result.pairings.map((pairing, index) => (
            <li key={index}>{pairing}</li>
          ))}
        </ul>
      </>
    )}
    <Link
      to="/"
      className="mt-8 bg-pink-800 hover:bg-pink-900 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
    >
      Back to Home
    </Link>
  </div>
</div>


      <footer className="w-full bg-pink-900 text-white py-4 shadow-md relative z-20">
        <div className="container mx-auto text-center">
          &copy; 2024 Olive Oil & Vinegar Quiz. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BalsamicResultPage;
