import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
    // <div className="md:min-w-97 flex flex-col ">
    <div className="md:min-w-97 flex flex-col not-only: ">
      <div className="flex gap-2 items-center bg-zinc-800 text-white px-4">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh9ZR7j2Oi5JHGSIe2mt2cgeVlwQb4mXg3kXIaPgEJQ&s=10" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            <p className="text-sm">Ns</p>
          </div>
        </div>
      </div>
      <Messages />
        <SendInput/>
    </div>
  );
};

export default MessageContainer;
