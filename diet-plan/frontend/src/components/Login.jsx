import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = ({isAuthenticated}) => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) {
    window.location.href = "/diet-plan"; // Redirect if already logged in
  }

  return (
    <>
      <div className={`min-h-screen bgNoise flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-white text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span  style={{color:"aqua"}}> Wellness360</span>
          </h1>
          <div className="flex justify-center space-x-4">
            <button className={'btnSignin'} onClick={() => loginWithRedirect()}>Log In</button>\
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;