import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import UserProvider from './context/userContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
        </Routes>
      </Router>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          top: 15,
        }}
        toastOptions={{
          duration: 2000,
          style: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
            maxWidth: '400px',
          },
        }}
      />
    </UserProvider>
  );
};

export default App;