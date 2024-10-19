import React from "react";
import SignupForm from "./SignupForm"; // Import the new component

const Signup = ({setIsLogin}) => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center px-40 pt-8 ">
        <a href="">
          <img src="logo.png" alt="Logo" className="w-[121px]" />
        </a>
        <a href="#" className="text-[#576474] text-lg font-medium">
          Contact
        </a>
      </div>

      <div className="flex justify-center items-center gap-52 mt-16 mb-10">
        <div className="w-[430px]">
          <p className="text-custom-dark font-medium leading-7">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#3F71FF] to-[#AA54FF] p-[1px] rounded-[15px]">
          <div className="w-[450px] flex flex-col justify-center items-center gap-5 bg-white rounded-[15px] p-4">
            <h2 className="text-3xl font-semibold">Sign Up</h2>
            <p className="font-medium text-custom-dark">
              Lorem Ipsum is simply dummy text
            </p>

            <SignupForm setIsLogin={setIsLogin} /> {/* Include the form component here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
