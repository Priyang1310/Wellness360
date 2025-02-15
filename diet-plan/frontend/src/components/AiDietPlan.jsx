import React, { useState, useRef } from "react";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function DietPlanForm() {
    const [days, setDays] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [dietPlan, setDietPlan] = useState(null);
    const [vegNonveg, setVegNonveg] = useState("0"); // Default: Vegetarian (0)
    
    const dietRef = useRef(); // Reference to diet plan div

    // Function to calculate BMI
    const calculateBMI = () => {
        if (weight && height) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);
            return bmiValue;
        } else {
            alert("Please enter weight and height!");
            return null;
        }
    };

    // Function to fetch diet plan from backend API
    const fetchDietPlan = async () => {
        const bmiValue = calculateBMI();
        if (!bmiValue) return;

        const content = `You are a **highly experienced professional nutritionist**. Your task is to create a **comprehensive, structured, and well-detailed diet plan** tailored to the individual's needs based on the following details:  

        - **📅 Duration:** ${days} days  
        - **⚖️ BMI:** ${bmi}  
        - **🥗 Diet Preference:** ${
                    vegNonveg === "0" ? "Vegetarian" : "Non-Vegetarian"
                }  
        🔹 **Nutritional Information:** Include the **calorie count, protein, carbs, and fats** for each meal to ensure a well-balanced diet.  

        🔹 Give Daywise dietplan breaking a day food into breakfast, lunch, dinner or whatever they are

        🔹 **Hydration & Supplement Tips:**  
          - Recommend **daily water intake** based on BMI and activity level.  
          - Suggest **vitamins or supplements** if necessary for overall health.  

        🔹 **Customization Based on BMI:**  
          - **BMI < 18.5 (Underweight):** Focus on **healthy weight gain**, high-protein, high-calorie, and nutrient-dense meals.  
          - **BMI 18.5 - 24.9 (Normal Weight):** Emphasize **balanced nutrition** to maintain an optimal weight and energy levels.  
          - **BMI > 25 (Overweight):** Focus on **healthy weight loss** with high-fiber, low-calorie, and metabolism-boosting foods.  

        🔹 **Special Diet Enhancements:**  
          - Offer **alternative food options** for allergies or dietary restrictions.  
          - Provide **precise portion sizes** based on BMI and calorie needs.  
          - Include **easy-to-follow, quick recipes** for key meals.  

        🔹 **Daily Health Tips & Motivation:**  
          - Give **practical health tips** each day.  
          - Include **motivation or simple exercises** to complement the diet plan.  

        ### **🔷 Formatting Guidelines:**  
        - **Use headings, bullet points, tables, and sections** for easy readability.  
        - **Ensure a structured and professional tone** throughout the response.  
        - **Make the plan engaging, actionable, and practical for real-world use.**  

        Generate a **detailed and well-organized diet plan** that aligns with these guidelines amd also dont give it in tabular format.
        Give response as a markdown code.`
        ;

        try {
            const response = await fetch("http://localhost:3333/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            const data = await response.json();
            setDietPlan(data.response); // Store API response
        } catch (error) {
            console.error("Error fetching diet plan:", error);
            setDietPlan("❌ Failed to fetch diet plan. Please try again!");
        }
    };

    // Function to download the diet plan as a PDF
    const downloadAsPDF = () => {
        const input = dietRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
            pdf.save(`Diet_Plan_${days}Days.pdf`);
        });
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
                AI Diet Plan Generator
            </h2>

            {/* Input Fields */}
            <label className="block text-lg font-medium text-gray-700">Number of Days</label>
            <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Enter days (e.g., 7)"
            />

            <label className="block text-lg font-medium text-gray-700 mt-4">Weight (kg)</label>
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Enter your weight (e.g., 70)"
            />

            <label className="block text-lg font-medium text-gray-700 mt-4">Height (cm)</label>
            <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-500"
                placeholder="Enter your height (e.g., 175)"
            />

            <label className="block text-lg font-medium text-gray-700 mt-4">Diet Preference</label>
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
                    <h3 className="text-xl font-semibold text-gray-800">Your BMI: {bmi}</h3>
                    <p
                        className={`mt-2 text-lg ${
                            bmi < 18.5 ? "text-blue-500" : bmi < 24.9 ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {bmi < 18.5 ? "Underweight" : bmi < 24.9 ? "Healthy Weight" : "Overweight"}
                    </p>
                </div>
            )}

            {/* Display Diet Plan */}
            {dietPlan && (
                <div ref={dietRef} className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
                        <ReactMarkdown
                            children={dietPlan}
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({ node, ...props }) => (
                                    <h1 className="text-3xl font-bold text-green-400 mt-4 mb-2" {...props} />
                                ),
                                h2: ({ node, ...props }) => (
                                    <h2 className="text-2xl font-semibold text-yellow-400 mt-3 mb-2" {...props} />
                                ),
                                h3: ({ node, ...props }) => (
                                    <h3 className="text-xl font-medium text-blue-300 mt-2 mb-2" {...props} />
                                ),
                                p: ({ node, ...props }) => (
                                    <p className="text-lg text-gray-300 mt-1 mb-2" {...props} />
                                ),
                                ul: ({ node, ...props }) => (
                                    <ul className="list-disc pl-5 text-gray-200" {...props} />
                                ),
                                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Download as PDF Button */}
            {dietPlan && (
                <button
                    onClick={downloadAsPDF}
                    className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                    Download as PDF 📄
                </button>
            )}
        </div>
    );
}

export default DietPlanForm;
