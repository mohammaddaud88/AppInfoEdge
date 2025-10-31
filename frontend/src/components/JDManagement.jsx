import React, { useState } from "react";
import {
  SparklesIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  ClockIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

const JDManagement = () => {
  const [jobInput, setJobInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedJD, setGeneratedJD] = useState(null);
  const [savedJDs, setSavedJDs] = useState([]);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api";

  const handleGenerateJD = async () => {
    if (!jobInput.trim()) {
      setError("Please enter a job title");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/generate-jd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitle: jobInput }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedJD(data.data);
      } else {
        setError(data.error || "Failed to generate job description");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Failed to connect to the server. Please check if the backend is running."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveJD = () => {
    if (generatedJD) {
      setSavedJDs([
        {
          ...generatedJD,
          id: Date.now(),
          status: "Active",
          createdAt: new Date().toLocaleString(),
        },
        ...savedJDs,
      ]);
      setGeneratedJD(null);
      setJobInput("");
    }
  };

  const handleDeleteJD = (id) => {
    setSavedJDs(savedJDs.filter((jd) => jd.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleGenerateJD();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <DocumentTextIcon className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  JD Management
                </h1>
              </div>
              <p className="text-gray-600 ml-14">
                AI-powered job description generator with Gemini
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total JDs</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {savedJDs.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input & Generator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Feature Info Card */}
            <div className="bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <SparklesIcon className="w-6 h-6" />
                How It Works
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <p className="pt-0.5">
                    Enter a job title and AI will automatically generate a
                    comprehensive job description with responsibilities and
                    required skills.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <p className="pt-0.5">
                    Review the AI-generated content, edit if needed, and save to
                    your job description library.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <p className="pt-0.5">
                    All saved JDs are tracked with version history and can be
                    reused or modified anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Generate Job Description
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={jobInput}
                    onChange={(e) => setJobInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="e.g., Senior Java Developer, Full Stack Engineer, Data Scientist..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    disabled={isGenerating}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Press Ctrl + Enter to generate quickly
                  </p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <ExclamationCircleIcon className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={handleGenerateJD}
                  disabled={!jobInput.trim() || isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isGenerating ? (
                    <>
                      <ArrowPathIcon className="w-5 h-5 animate-spin" />
                      Generating with Gemini AI...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-5 h-5" />
                      Generate JD with AI
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated JD Preview */}
            {generatedJD && (
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-200 animate-fadeIn">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      <h2 className="text-2xl font-bold text-gray-900">
                        {generatedJD.title}
                      </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Department:</span>{" "}
                        {generatedJD.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Location:</span>{" "}
                        {generatedJD.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium">Level:</span>{" "}
                        {generatedJD.experienceLevel}
                      </span>
                    </div>
                  </div>
                  <button
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit JD"
                  >
                    <PencilSquareIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Responsibilities */}
                  <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Key Responsibilities
                    </h3>
                    <ul className="space-y-2">
                      {generatedJD.responsibilities.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-blue-500 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Must-Have Skills */}
                  <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Must-Have Skills
                    </h3>
                    <ul className="space-y-2">
                      {generatedJD.mustHave.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircleIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Good-to-Have Skills */}
                  <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Good-to-Have Skills
                    </h3>
                    <ul className="space-y-2">
                      {generatedJD.goodToHave.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-purple-500 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleSaveJD}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02]"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    Save Job Description
                  </button>
                  <button
                    onClick={() => {
                      setGeneratedJD(null);
                      setError(null);
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Saved JDs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DocumentTextIcon className="w-6 h-6 text-indigo-600" />
                Saved JDs
              </h2>

              {savedJDs.length === 0 ? (
                <div className="text-center py-12">
                  <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No saved JDs yet</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Generated JDs will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {savedJDs.map((jd) => (
                    <div
                      key={jd.id}
                      className="group border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                            {jd.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              {jd.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                        <ClockIcon className="w-3 h-3" />
                        {jd.createdAt}
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-medium rounded hover:bg-indigo-100 transition-colors">
                          <EyeIcon className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteJD(jd.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c7d2fe;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #a5b4fc;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`}</style>
    </div>
  );
};

export default JDManagement;
