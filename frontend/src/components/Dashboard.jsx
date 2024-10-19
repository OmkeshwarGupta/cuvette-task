import React, { useState } from "react";
import { HiMiniHome } from "react-icons/hi2";
import InterviewForm from "./InterviewForm";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie"; // Import js-cookie for managing cookies

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreateInterview = () => {
    setShowForm(true);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove("token");
    
    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <div className="h-full relative">
      <div className="flex flex-row justify-between items-center px-40 py-7 border-b">
        <a href="">
          <img src="logo.png" alt="Logo" className="w-[121px]" />
        </a>
        <div className="flex justify-center items-center gap-4">
          <a href="#" className="text-[#576474] text-lg font-medium">
            Contact
          </a>
          <div className="flex items-center gap-2 relative">
            <div className="w-6 h-6 rounded-full bg-gray-400 absolute left-3" />
            <div
              onClick={toggleDropdown}
              className="cursor-pointer border flex justify-center items-center border-gray-300 rounded-md pl-10 py-1 w-40"
            >
              Your Name
              {showDropdown ? (
                <IoIosArrowUp className="text-[#576474] ml-2" />
              ) : (
                <IoIosArrowDown className="text-[#576474] ml-2" />
              )}
            </div>

            {/* Dropdown Box */}
            {showDropdown && (
              <div className="absolute right-0 top-9 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <div
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout} // Add logout function
                >
                  <FiLogOut className="text-[#576474] mr-2" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="h-screen w-20 border-r absolute left-0">
        <div>
          <HiMiniHome className="text-3xl text-[#576474] mx-auto mt-5" />
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-28 pt-8">
        {/* Conditionally render the button */}
        {!showForm && (
          <button
            onClick={handleCreateInterview}
            className="bg-blue-600 text-white py-2 text-xl px-6 font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Create Interview
          </button>
        )}

        {/* Render Interview Form when showForm is true */}
        {showForm && <InterviewForm />}
      </div>
    </div>
  );
};

export default Dashboard;
