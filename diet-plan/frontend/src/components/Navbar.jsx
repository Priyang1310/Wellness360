import React from 'react';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-5 px-8 shadow-lg z-50 backdrop-blur-lg bg-gradient-to-r from-green-200 to-green-50">
      <div className="text-3xl font-extrabold tracking-wide animate-fade-in text-green-900">Wellness360</div>
      <ul className="flex gap-8 text-lg font-medium animate-slide-in">
        <li><a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">Home</a></li>
        <li><a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">Diet Plans</a></li>
        <li><a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">Trainers</a></li>
        <li><a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">AI Diet</a></li>
        <li><a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;