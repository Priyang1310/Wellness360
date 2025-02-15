import React from "react";
import "../styles/Loader.css"; // Ensure this file has the styles from loader.html

const Loader = () => {
  return (
    <div className="wheel-and-hamster">
      <div className="wheel"></div>
      <div className="hamster">
        <div className="hamster__body">
          <div className="hamster__head">
            <div className="hamster__ear"></div>
            <div className="hamster__eye"></div>
            <div className="hamster__nose"></div>
          </div>
          <div className="hamster_limb hamster_limb--fr"></div>
          <div className="hamster_limb hamster_limb--fl"></div>
          <div className="hamster_limb hamster_limb--br"></div>
          <div className="hamster_limb hamster_limb--bl"></div>
          <div className="hamster__tail"></div>
        </div>
      </div>
      <div className="spoke"></div>
    </div>
  );
};

export default Loader;