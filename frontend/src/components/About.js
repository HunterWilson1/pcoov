import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import olivebackground from '../assets/olive.webp';

const AboutPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const backgroundStyle = {
    backgroundImage: `url(${olivebackground})`,
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
          <div className="flex items-center">
            <div className="text-2xl font-bold">Find Your Olive Oil</div>
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
                className={`${isOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30`}
              >
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/#home"
                      className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                    >
                      Home
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/about"
                      className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
                    >
                      About
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/contact"
                      className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}
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

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-2xl bg-opacity-90">
          <h2 className="text-3xl font-bold mb-6 text-green-700">About Us</h2>
          <p className="text-lg mb-6">
            Welcome to Find Your Olive Oil! We are dedicated to helping you discover the perfect olive oil and vinegar to match your taste preferences. Our quizzes are designed to provide you with personalized recommendations based on your unique flavor profile.
          </p>
          <p className="text-lg mb-6">
            Our mission is to bring the highest quality olive oils and vinegars to your kitchen. We source our products from the finest producers around the world, ensuring that each bottle meets our rigorous standards for taste and quality.
          </p>
          <p className="text-lg mb-6">
            Whether you're a seasoned cook or just starting your culinary journey, we're here to help you find the perfect additions to your pantry. Thank you for choosing Find Your Olive Oil!
          </p>
        </div>
      </main>

      <footer className="w-full bg-green-800 text-white py-4 shadow-md z-20">
        <div className="container mx-auto text-center">
          &copy; 2024 Find Your Olive Oil. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
