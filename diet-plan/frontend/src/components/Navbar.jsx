// import React from 'react';
// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-5 px-8 shadow-lg z-50 backdrop-blur-lg bg-gradient-to-r from-green-200 to-green-50">
//       <div className="text-3xl font-extrabold tracking-wide animate-fade-in text-green-900">Wellness360</div>
//       <ul className="flex gap-8 text-lg font-medium animate-slide-in">
//         <Link to="/" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
//           Home
//         </Link>
//         <li><a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">Diet Plans</a></li>
//         <Link to="/my-reports" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
//           My reports
//         </Link>
//         <Link to="/ai-diet-plan" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
//           AI Diet
//         </Link>
//         <li><a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">Contact</a></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex justify-between items-center px-8 shadow-lg z-50 backdrop-blur-lg bg-gradient-to-r from-green-200 to-green-50">
      <div className="text-3xl font-extrabold tracking-wide text-green-900">Wellness360</div>
      <ul className="flex gap-8 text-lg font-medium">
        <Link to="/" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
          Home
        </Link>
        <li><a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">Diet Plans</a></li>
        <Link to="/my-reports" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
          My Reports
        </Link>
        <Link to="/ai-diet-plan" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
          AI Diet
        </Link>
        <li><a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
