import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import OliveOilQuiz from "./components/OliveOilQuiz";
import BalsamicQuiz from "./components/BalsamicQuiz";
import OliveResult from './components/Oresult';
import BalsamicResult from './components/Bresult';
import About from './components/About';
import Contact from'./components/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/olive-oil-quiz" element={<OliveOilQuiz />} />
        <Route path="/balsamic-quiz" element={<BalsamicQuiz />} />
        <Route path="/olive-result" element={<OliveResult />} />
        <Route path="/balsamic-result" element={<BalsamicResult />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
