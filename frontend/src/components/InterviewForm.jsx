import React from "react";

const InterviewForm = () => {
  return (
    <div className="w-[700px] text-xl  " >
      <form className="flex flex-col justify-center items-end">
        <div className="mb-4 flex justify-end items-center gap-4 ">
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            placeholder="Enter Job Title"
            className=" w-[500px]  border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </div>

        <div className="mb-4 flex justify-end  gap-4">
          <label className="block pt-3 text-gray-700">Job Description</label>
          <textarea
            placeholder="Enter Job Description"
            className="w-[500px]  h-32 border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </div>

        <div className="mb-4 flex justify-end  items-center gap-4">
          <label className="block text-gray-700">Experience Level</label>
          <select className="w-[500px]  text-gray-400  border border-gray-300 rounded-md px-3 py-2 mt-1">
            <option>Select Experience Level</option>
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
          </select>
        </div>

        <div className="mb-4 flex justify-end  items-center gap-4">
          <label className="block text-gray-700">Add Candidate</label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            className="w-[500px] border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </div>

        <div className="mb-4 flex justify-end  items-center gap-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            className="w-[500px] text-gray-400  border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 flex text-white  mt-4 py-1 px-10 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default InterviewForm;
