import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./Pages/Home";
import AiDietPlan from "./components/AiDietPlan.jsx";
import Reports from "./components/Reports.jsx";
import Login from "./components/Login.jsx";

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Show loading while checking authentication
  }

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login isAuthenticated={isAuthenticated}/>}/>
            <Route path="/diet-plan" element={<Home />} />
            <Route path="/ai-diet-plan" element={<AiDietPlan />} />
            <Route path="/my-reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/diet-plan" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
