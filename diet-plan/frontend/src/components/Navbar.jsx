import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: `${window.location.origin}/login` } }); // Redirect to /login after logout
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex justify-between items-center px-8 shadow-lg z-50 backdrop-blur-lg bg-gradient-to-r from-green-200 to-green-50">
      {/* Logo */}
      <div className="text-3xl font-extrabold tracking-wide text-green-900">Wellness360</div>

      {/* Navbar Links */}
      <ul className="flex items-center gap-8 text-lg font-medium">
        <Link to="/diet-plan" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
          Home
        </Link>
        <li>
          <a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
            Diet Plans
          </a>
        </li>
        <Link to="/my-reports" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
          My Reports
        </Link>
        <Link to="/ai-diet-plan" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
          AI Diet
        </Link>
        <li>
          <a href="#" className="hover:text-yellow-500 transition-all duration-300 text-green-900">
            Contact
          </a>
        </li>

        {/* Logout Button */}
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2.5 rounded-md hover:bg-red-600 transition-all duration-300 shadow-md"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
