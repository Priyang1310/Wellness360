import React, { useState, useEffect } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Loader from "./Loader"; // Import the Loader component
import "../styles/Loader.css"; // Import styles
import Navbar from "./Navbar";

function DietPlanForm() {
    const [days, setDays] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [dietPlan, setDietPlan] = useState(null);
    const [vegNonveg, setVegNonveg] = useState("0");
    const [loading, setLoading] = useState(false); // Loader state
    const [pdfUrl, setPdfUrl] = useState(null); // New state for Cloudinary PDF URL

    // Function to calculate BMI
    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100;
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
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = "auto"; // Enable scrolling
        }
        return () => {
            document.body.style.overflow = "auto"; // Cleanup when unmounting
        };
    }, [loading]);

    // Function to fetch diet plan from backend API
    const fetchDietPlan = async () => {
        const bmiValue = calculateBMI();
        if (!bmiValue) return;

        const content = `You are a *highly experienced professional nutritionist. Your task is to create a **comprehensive, structured, and well-detailed diet plan* tailored to the individual's needs based on the following details:  

        - *📅 Duration:* ${days} days  
        - *⚖ BMI:* ${bmi}  
        - *🥗 Diet Preference:* ${
            vegNonveg === "0" ? "Vegetarian" : "Non-Vegetarian"
        }  
        🔹 *Nutritional Information:* Include the *calorie count, protein, carbs, and fats* for each meal to ensure a well-balanced diet.  

        🔹 Give Daywise dietplan breaking a day food into breakfast, lunch, dinner or whatever they are

        🔹 *Hydration & Supplement Tips:*  
          - Recommend *daily water intake* based on BMI and activity level.  
          - Suggest *vitamins or supplements* if necessary for overall health.  

        🔹 *Customization Based on BMI:*  
          - *BMI < 18.5 (Underweight):* Focus on *healthy weight gain*, high-protein, high-calorie, and nutrient-dense meals.  
          - *BMI 18.5 - 24.9 (Normal Weight):* Emphasize *balanced nutrition* to maintain an optimal weight and energy levels.  
          - *BMI > 25 (Overweight):* Focus on *healthy weight loss* with high-fiber, low-calorie, and metabolism-boosting foods.  

        🔹 *Special Diet Enhancements:*  
          - Offer *alternative food options* for allergies or dietary restrictions.  
          - Provide *precise portion sizes* based on BMI and calorie needs.  
          - Include *easy-to-follow, quick recipes* for key meals.  

        🔹 *Daily Health Tips & Motivation:*  
          - Give *practical health tips* each day.  
          - Include *motivation or simple exercises* to complement the diet plan.  

        ### *🔷 Formatting Guidelines:*  
        - *Use headings, bullet points, tables, and sections* for easy readability.  
        - *Ensure a structured and professional tone* throughout the response.  
        - *Make the plan engaging, actionable, and practical for real-world use.*  

        Generate a *detailed and well-organized diet plan* that aligns with these guidelines amd also dont give it in tabular format.
        Give response as a markdown code.`;

        setLoading(true);

        try {
            const response = await fetch("https://wellness360.onrender.com/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            const data = await response.json();

            setDietPlan(data.response); // Store diet plan response
            setPdfUrl(data.pdfUrl); // Store Cloudinary PDF URL
        } catch (error) {
            console.error("Error fetching diet plan:", error);
            setDietPlan("❌ Failed to fetch diet plan. Please try again!");
            setPdfUrl(null);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle PDF download
    const handleDownloadPDF = async () => {
        if (!dietPlan) {
            alert("No diet plan available to download.");
            return;
        }

        try {
            const response = await fetch("https://wellness360.onrender.com/generate-pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ markdown: dietPlan }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "diet-plan.pdf";
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                alert("Failed to generate PDF.");
            }
        } catch (error) {
            console.error("Error downloading PDF:", error);
            alert("Error downloading PDF.");
        }
    };

    return (
        <div
            className="min-h-screen bg-fixed bg-cover bg-center flex items-center justify-center mt-16"
            style={{ backgroundImage: 'url("/form background1.png")' }}
        >
            <Navbar />
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white/60 backdrop-blur-lg z-50">
                    <Loader />
                    <p className="mt-4 text-lg font-semibold text-green-800">
                        Preparing your diet plan...
                    </p>
                </div>
            )}

            <div
                className={`max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 transition-all duration-300 ${
                    loading ? "blur-md pointer-events-none select-none" : ""
                }`}
            >
                <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
                    AI Diet Plan Generator
                </h2>

                {/* Input Fields */}
                <label className="block text-lg font-medium text-gray-700">
                    Number of Days
                </label>
                <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Enter days (e.g., 7)"
                />

                <label className="block text-lg font-medium text-gray-700 mt-4">
                    Weight (kg)
                </label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your weight (e.g., 70)"
                />

                <label className="block text-lg font-medium text-gray-700 mt-4">
                    Height (cm)
                </label>
                <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your height (e.g., 175)"
                />

                <label className="block text-lg font-medium text-gray-700 mt-4">
                    Diet Preference
                </label>
                <select
                    value={vegNonveg}
                    onChange={(e) => setVegNonveg(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500"
                >
                    <option value="0">Vegetarian</option>
                    <option value="1">Non-Vegetarian</option>
                </select>

                <button
                    onClick={fetchDietPlan}
                    className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300"
                >
                    Get Diet Plan
                </button>

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
                        <div
                            id="format"
                            className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto"
                        >
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
                                }}
                            />
                            <hr />
                            <br />
                            {pdfUrl && (
                                <div className="flex align-center justify-center">
                                    <a
                                        href={pdfUrl}
                                        download="diet-plan.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mb-1 bg-blue-600 text-white py-2  px-4 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        Download PDF
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DietPlanForm;
