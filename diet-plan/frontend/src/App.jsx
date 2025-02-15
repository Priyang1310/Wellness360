// import React from 'react'
// import Home from './components/Home'
// function App() {
//   return (
//     <div id='main'>
//       <Home/>
//     </div>
//   )
// }

// export default App


import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AiDietPlan from "./components/AiDietPlan.jsx"; // Import AiDietPlan

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-diet-plan" element={<AiDietPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
