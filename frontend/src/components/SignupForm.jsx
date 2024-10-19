import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";
import { MdMailOutline } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import Verify from "./Verify"; // Import the new Verify component

const SignupForm = ({setIsLogin}) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    companyEmail: "",
    employeeSize: "",
  });

  const [showVerify, setShowVerify] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setShowVerify(true); // Show the Verify component after form submission
  };

  if (showVerify) {
    return <Verify />; // Display the Verify component
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Form inputs remain unchanged */}
      <div className="relative">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-[350px] mx-10 border border-[#cccccc] rounded-md px-12 h-10 text-[#535353]"
        />
        <GoPerson className="text-[#535353] absolute top-3 left-14" />
      </div>
      <div className="relative">
        <input
          type="text"
          name="phone"
          placeholder="Phone no."
          value={formData.phone}
          onChange={handleChange}
          className="w-[350px] mx-10 border border-[#cccccc] rounded-md px-12 h-10 text-[#535353]"
        />
        <IoCallOutline className="text-[#535353] absolute top-3 left-14" />
      </div>
      <div className="relative">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="w-[350px] mx-10 border border-[#cccccc] rounded-md px-12 h-10 text-[#535353]"
        />
        <GoPerson className="text-[#535353] absolute top-3 left-14" />
      </div>
      <div className="relative">
        <input
          type="email"
          name="companyEmail"
          placeholder="Company Email"
          value={formData.companyEmail}
          onChange={handleChange}
          className="w-[350px] mx-10 border border-[#cccccc] rounded-md px-12 h-10 text-[#535353]"
        />
        <MdMailOutline className="text-[#535353] absolute top-3 left-14" />
      </div>
      <div className="relative">
        <input
          type="text"
          name="employeeSize"
          placeholder="Employee Size"
          value={formData.employeeSize}
          onChange={handleChange}
          className="w-[350px] mx-10 border border-[#cccccc] rounded-md px-12 h-10 text-[#535353]"
        />
        <MdOutlineGroups className="text-[#535353] absolute top-3 left-14" />
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="w-[300px] text-center font-bold text-custom-dark">
          By clicking on proceed you will accept our{" "}
          <span className="text-custom-2">Terms</span> &{" "}
          <span className="text-custom-2">Conditions</span>
        </p>
        <button
          type="submit"
          className="w-[350px] mt-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Proceed
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
