import React, { useState } from "react";

// Diet Plan Form Component
function DietPlanForm() {
  const [days, setDays] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);
  const [vegNonveg, setVegNonveg] = useState("0"); // Default: Vegetarian (0)

  // Function to calculate BMI
  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
    } else {
      alert("Please enter weight and height!");
    }
  };

  // Function to fetch diet plan from backend API
  const fetchDietPlan = async () => {
    calculateBMI(); // First, calculate BMI

    const content = `Generate diet plan for ${days} days for a person having BMI value of ${bmi}, and also give it in a properly formatted manner (using bullet points, sections, etc.). Generate it for ${
      vegNonveg === "0" ? "Vegetarian" : "Non-Vegetarian"
    } diet.`;

    try {
      const response = await fetch("http://localhost:3333/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      console.log(data.response);

      setDietPlan(data.response);
    } catch (error) {
      console.error("Error fetching diet plan:", error);
      setDietPlan("Failed to fetch diet plan. Please try again!");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
        AI Diet Plan Generator
      </h2>

      {/* Number of Days */}
      <label className="block text-lg font-medium text-gray-700">
        Number of Days
      </label>
      <input
        type="number"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter days (e.g., 7)"
      />

      {/* Weight Input */}
      <label className="block text-lg font-medium text-gray-700 mt-4">
        Weight (kg)
      </label>
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter your weight (e.g., 70)"
      />

      {/* Height Input */}
      <label className="block text-lg font-medium text-gray-700 mt-4">
        Height (cm)
      </label>
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter your height (e.g., 175)"
      />

      {/* Vegetarian or Non-Vegetarian Selection */}
      <label className="block text-lg font-medium text-gray-700 mt-4">
        Diet Preference
      </label>
      <select
        value={vegNonveg}
        onChange={(e) => setVegNonveg(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="0">Vegetarian</option>
        <option value="1">Non-Vegetarian</option>
      </select>

      {/* Get Diet Plan Button */}
      <button
        onClick={fetchDietPlan}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
      >
        Get Diet Plan
      </button>

      {/* Display BMI Score */}
      {bmi && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Your BMI: {bmi}
          </h3>
          <p
            className={`mt-2 text-lg ${
              bmi < 18.5
                ? "text-blue-500"
                : bmi < 24.9
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {bmi < 18.5
              ? "Underweight"
              : bmi < 24.9
              ? "Healthy Weight"
              : "Overweight"}
          </p>
        </div>
      )}

      {/* Display Diet Plan */}
      {dietPlan && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">
            Your AI-Generated Diet Plan:
          </h3>
          <p className="text-gray-700 mt-2">{dietPlan}</p>
        </div>
      )}
    </div>
  );
}

export default DietPlanForm