import React, { useState } from "react";
import Navbar from "./Navbar";

const Reports = () => {
    const [reports, setReports] = useState([
        { id: 1, title: "Diet Plan - 7 Days", date: "Feb 10, 2025" },
        { id: 2, title: "Weight Loss Plan", date: "Jan 28, 2025" },
        { id: 3, title: "Healthy Eating Guide", date: "Jan 15, 2025" },
    ]);

    // Function to delete a report
    const deleteReport = (id) => {
        setReports(reports.filter((report) => report.id !== id));
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url('/reports background.jpg')` }}
        >
            <Navbar/>
            <div className="max-w-3xl mx-auto p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Reports</h2>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="w-full border-collapse">
                        <thead className="bg-green-700 text-white text-left">
                            <tr>
                                <th className="p-4 text-lg">Report Title</th>
                                <th className="p-4 text-lg">Date</th>
                                <th className="p-4 text-lg text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-100 transition">
                                    <td className="p-4 text-gray-700">{report.title}</td>
                                    <td className="p-4 text-gray-500">{report.date}</td>
                                    <td className="p-4 flex justify-center gap-3">
                                        <button className="px-4 py-2 text-sm font-semibold text-black hover:text-green-600 transition-all">
                                            View Online
                                        </button>
                                        <button className="px-4 py-2 text-sm font-semibold text-black hover:text-green-600 transition-all">
                                            Download
                                        </button>
                                        <button
                                            onClick={() => deleteReport(report.id)}
                                            className="px-4 py-2 text-sm font-semibold text-black hover:text-red-500 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;