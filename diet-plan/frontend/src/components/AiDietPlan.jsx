import React, { useState } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

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
            const bmiValue = (
                weight /
                (heightInMeters * heightInMeters)
            ).toFixed(2);
            setBmi(bmiValue);
            return bmiValue;
        } else {
            alert("Please enter weight and height!");
            return null;
        }
    };

    // Function to fetch diet plan from backend API
    const fetchDietPlan = async () => {
        const bmiValue = calculateBMI(); // First, calculate BMI

        if (!bmiValue) return; // Stop execution if BMI calculation fails

        const content = `Generate a structured diet plan for ${days} days for a person with a BMI of ${bmiValue}. Format it using markdown. Generate for a ${
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
            setDietPlan(data.response); // Store API response
        } catch (error) {
            console.error("Error fetching diet plan:", error);
            setDietPlan("❌ Failed to fetch diet plan. Please try again!");
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

            {/* Diet Preference */}
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

            {/* Display Diet Plan using react-markdown */}
            {dietPlan && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    
                    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
                        <ReactMarkdown
                            children={dietPlan}
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ node, ...props }) => (
                                    <h1
                                        className="text-3xl font-bold text-green-400 mt-4 mb-2"
                                        {...props}
                                    />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2
                                        className="text-2xl font-semibold text-yellow-400 mt-3 mb-2"
                                        {...props}
                                    />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3
                                        className="text-xl font-medium text-blue-300 mt-2 mb-2"
                                        {...props}
                                    />
                                ),
                                p: ({ node, ...props }) => (
                                    <p
                                        className="text-lg text-gray-300 mt-1 mb-2"
                                        {...props}
                                    />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul
                                        className="list-disc pl-5 text-gray-200"
                                        {...props}
                                    />
                                ),
                                li: ({ node, ...props }) => (
                                    <li className="mb-1" {...props} />
                                ),
                                blockquote: ({ node, ...props }) => (
                                    <blockquote
                                        className="border-l-4 border-green-400 pl-4 italic text-gray-300"
                                        {...props}
                                    />
                                ),
                                hr: ({ node, ...props }) => (
                                    <hr
                                        className="border-gray-700 my-4"
                                        {...props}
                                    />
                                ),
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DietPlanForm;
