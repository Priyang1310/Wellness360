import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AiDietPlan from "./components/AiDietPlan.jsx"; // Import AiDietPlan
import Reports from "./components/Reports.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-diet-plan" element={<AiDietPlan />} />
        <Route path="/my-reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;