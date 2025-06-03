import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileInfoCard from "../Cards/profileInfoCard";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isInterviewPrepPage = location.pathname.includes('interview-prep');

  const handleNavigation = () => {
    if (isInterviewPrepPage) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBFB]">
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-0">
          <div className="h-16 flex items-center justify-between">
            <button 
              onClick={handleNavigation}
              className="text-xl text-black font-bold hover:text-[#FF9324] transition-colors"
            >
              Interview Prep AI
            </button>
            <ProfileInfoCard />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
