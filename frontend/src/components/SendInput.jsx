import React from "react";
import { IoSend } from "react-icons/io5";

const SendInput = () => {
  return (
    <form action="" className="py-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message..."
          className="border text-sm rounded-lg block w-full bg-gray-600 p-2 border-zinc-500 text-white"
        />
        <button className="absolute flex end-0 inset-y-0 items-center pr-4">
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
