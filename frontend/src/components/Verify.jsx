import React, { useState } from "react";
import { MdMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Verify = () => {
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailOtpChange = (e) => {
    setEmailOtp(e.target.value);
  };

  const handleMobileOtpChange = (e) => {
    setMobileOtp(e.target.value);
  };

  const handleEmailVerify = () => {
    // Simulate OTP verification
    if (emailOtp === "1234") { // Replace with your actual OTP verification logic
      setIsEmailVerified(true);
      console.log("Email verified"); // Debug log
      checkVerificationStatus();
    } else {
      alert("Invalid Email OTP");
    }
  };

  const handleMobileVerify = () => {
    // Simulate OTP verification
    if (mobileOtp === "5678") { // Replace with your actual OTP verification logic
      setIsMobileVerified(true);
      alert(" use /dashboard to see dashboard");
      console.log("Mobile verified"); // Debug log
      checkVerificationStatus();
    } else {
      alert("Invalid Mobile OTP");
    }
  };

  const checkVerificationStatus = () => {
    console.log("Checking verification status..."); // Debug log
    if (isEmailVerified && isMobileVerified) {
      alert(" use /dashboard to see dashboard"); // Replace with the actual path to your dashboard
      console.log("Both verifications successful. Redirecting..."); // Debug log
      navigate("/dashboard"); // Replace with the actual path to your dashboard
    } else {
      console.log("Verification status: ", {
        isEmailVerified,
        isMobileVerified,
      }); // Log the current verification status
    }
  };

  return (
    <div className="w-[450px] flex flex-col justify-center items-center gap-5 bg-white rounded-[15px] p-4">
      <div className="w-full flex flex-col items-center gap-4">
        {/* Email OTP */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Email OTP (use 1234)"
            value={emailOtp}
            onChange={handleEmailOtpChange}
            className="w-full border border-[#cccccc] rounded-md px-12 h-10 text-[#535353]"
            disabled={isEmailVerified} // Disable input after verification
          />
          <MdMailOutline className="text-[#535353] absolute top-3 left-4" />
          {isEmailVerified && (
            <AiOutlineCheckCircle className="text-green-500 absolute top-3 right-4" />
          )}
        </div>
        {/* Hide button after successful verification */}
        {!isEmailVerified && (
          <button
            onClick={handleEmailVerify}
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Verify
          </button>
        )}

        {/* Mobile OTP */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Mobile OTP (use 5678)"
            value={mobileOtp}
            onChange={handleMobileOtpChange}
            className="w-full border border-[#cccccc] rounded-md px-12 h-10 text-[#535353]"
            disabled={isMobileVerified} // Disable input after verification
          />
          <IoCallOutline className="text-[#535353] absolute top-3 left-4" />
          {isMobileVerified && (
            <AiOutlineCheckCircle className="text-green-500 absolute top-3 right-4" />
          )}
        </div>
        {/* Hide button after successful verification */}
        {!isMobileVerified && (
          <button
            onClick={handleMobileVerify}
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Verify
          </button>
        )}
      </div>
    </div>
  );
};

export default Verify;
