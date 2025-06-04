export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_PATHS = {
  AUTH: {
    REGISTER: `${BASE_URL}/api/auth/register`, // Signup
    LOGIN: `${BASE_URL}/api/auth/login`, // Authenticate user & return JWT token
    GET_PROFILE: `${BASE_URL}/api/auth/profile`, // Get logged-in user details
  },

  IMAGE: {
    UPLOAD_IMAGE: `${BASE_URL}/api/auth/upload-image`, // Upload profile picture
  },

  AI: {
    GENERATE_QUESTIONS: `${BASE_URL}/api/ai/generate-questions`, // Generate interview questions and answers using Gemini
    GENERATE_EXPLANATION: `${BASE_URL}/api/ai/generate-explanation`, // Generate concept explanation using Gemini
  },

  SESSION: {
    CREATE: `${BASE_URL}/api/sessions/create`, // Create a new interview session with questions
    GET_ALL: `${BASE_URL}/api/sessions/my-sessions`, // Get all user sessions
    GET_ONE: (id) => `${BASE_URL}/api/sessions/${id}`, // Get session details with questions
    DELETE: (id) => `${BASE_URL}/api/sessions/${id}`, // Delete a session
  },

  QUESTION: {
    ADD_TO_SESSION: `${BASE_URL}/api/questions/add`, // Add more questions to a session
    PIN: (id) => `${BASE_URL}/api/questions/${id}/pin`, // Pin or Unpin a question
    UPDATE_NOTE: (id) => `${BASE_URL}/api/questions/${id}/note`, // Update/Add a note to a question
  },
};
