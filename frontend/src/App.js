import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import OliveOilQuiz from "./components/OliveOilQuiz";
import BalsamicQuiz from "./components/BalsamicQuiz";
import Results from './components/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/olive-oil-quiz" element={<OliveOilQuiz />} />
        <Route path="/balsamic-quiz" element={<BalsamicQuiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
