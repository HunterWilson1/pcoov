import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid';
import olivebackground from '../assets/olive.webp';

const ContactPage = () => {
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
        <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md bg-opacity-90">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Contact Us</h2>
          <div className="text-lg mb-4">
            <p className="font-semibold">Pass Christian Olive Oil & Vinegar</p>
            <p>+1 (228) 452-9470</p>
            <p>evoo@gulfcoastolives.com</p>
            <p className="font-semibold mt-4">Hours of Operation:</p>
            <p>Monday: 10:00 AM - 5:00 PM</p>
            <p>Tuesday - Saturday: 10:00 AM - 6:00 PM</p>
            <p>Sunday: 12:00 AM - 4:00 PM</p>
            <p className="font-semibold pt-7">Pass Christian Olive Oil & Vinegar</p>
            <p>(555) 555-5555</p>
            <p className="font-semibold mt-4">Hours of Operation:</p>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
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

export default ContactPage;
