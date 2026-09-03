import React from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";

const Slidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col ">
      <form action="" className="flex items-center">
        <input
          // className='input input-bordered rounded-md'
          className="input input-bordered rounded-full w-full 
                     bg-white/90 text-gray-900 placeholder-gray-500
                     border-2 border-transparent
                     focus:border-sky-400 focus:bg-white focus:outline-none
                     shadow-md
                     transition-all duration-200"
          type="text"
          placeholder="Search..."
        />

        <button
          type="submit"
          className="btn m-2 btn-circle bg-sky-500 hover:bg-sky-600 active:scale-95
             text-white border-none shadow-md hover:shadow-lg
             transition-all duration-200 shrink-0"
        >
          <FaSearch size="18px" />
        </button>
      </form>

      <div className="divider px-3" > </div>
      <OtherUsers/>
      <div className="mt-2 ">
        <button className="btn btn-sm  bg-gray-300  border-gray-400  rounded-[7px]">Logout</button>
      </div>

    </div>
  );
};

export default Slidebar;
