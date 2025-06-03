import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 10,
      });
      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });
      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-2">Start a New Interview Journey</h2>
      <p className="text-gray-600 mb-8">Fill out a few quick details and unlock your personalized set of interview questions!</p>

      <form onSubmit={handleCreateSession}>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-800 mb-2">Target Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="UI UX Designer"
              className="w-full px-4 py-3 text-[15px] bg-gray-50/50 rounded-lg border border-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF9324]/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-2">Years of Experience</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
              placeholder="5"
              className="w-full px-4 py-3 text-[15px] bg-gray-50/50 rounded-lg border border-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF9324]/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-2">Topics to Focus On</label>
            <input
              type="text"
              value={formData.topicsToFocus}
              onChange={(e) => handleChange("topicsToFocus", e.target.value)}
              placeholder="Figma, Prototyping, Design Systems"
              className="w-full px-4 py-3 text-[15px] bg-gray-50/50 rounded-lg border border-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF9324]/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-800 mb-2">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Preparing for UI/UX"
              className="w-full px-4 py-3 text-[15px] bg-gray-50/50 rounded-lg border border-gray-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF9324]/20 transition-all duration-200"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-rose-500">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-8 font-medium px-6 py-3.5 rounded-lg transition-all duration-200 
            ${isLoading 
              ? 'bg-[#FF9324]/80 text-white cursor-not-allowed' 
              : 'bg-[#1e2936] text-white hover:bg-[#FF9324] hover:shadow-lg hover:shadow-orange-200'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <SpinnerLoader />
              <span>Creating Session...</span>
            </div>
          ) : (
            "Create Session"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
