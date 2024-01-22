import React from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import OOQuiz from "./components/OliveOilQuiz";
import BQuiz from "./components/BalsamicQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/olive-oil-quiz" element={<OOQuiz />} />
        <Route path="/balsamic-quiz" element={<BQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;

