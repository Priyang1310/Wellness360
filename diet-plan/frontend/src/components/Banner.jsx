import React from 'react';
import { useNavigate } from 'react-router-dom'

function Banner() {
  // const handleScroll = () => {
  //   window.scrollBy({
  //     top: window.innerHeight, // Scroll down by 100vh
  //     behavior: 'smooth' // Smooth scrolling effect
  //   });
  // };

  const navigate = useNavigate()

  return (
    <div className="relative w-full h-[100vh] overflow-hidden pt-[80px]">
      <img src="/Banner1.png" alt="Healthy Lifestyle" className="w-full h-full object-cover brightness-75 animate-zoom-in" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-5xl font-bold mb-4 animate-fade-in">Transform Your Health with Wellness360</h1>
        <p className="text-xl mb-6 animate-slide-up delay-200">Personalized diet plans from expert trainers and AI-powered recommendations.</p>
        {/* <button
          onClick={handleScroll}
          className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white transition-all duration-300 transform hover:scale-110 animate-pulse"
        >
          Get Started
        </button> */}
        <button
          onClick={() => navigate("/ai-diet-plan")}
          className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Try Ai Diet
        </button>
      </div>
    </div>
  );
}

export default Banner;