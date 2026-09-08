import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const {selectedUser, authUser} = useSelector(state => state.user);
  console.log("Now --> ", selectedUser)
  console.log("");
  // console.log("Auth User: ", authUser);
  // console.log("Now --> ", selectedUser?.fullName)
  // console.log("Now --> ", selectedUser?.profilePhoto)


  // cleanup redux after logout
  // but for current scnario this is not needed because after refresh it become empty automatically 
  // const dispatch = useSelector();
  // useEffect(()=>{
  //   return () => dispatch(selectedUser(null))
  // }, []);


  return (
    // <div className="md:min-w-97 flex flex-col ">
    <>
    {
      selectedUser ? (
        <div className="md:min-w-97 flex flex-col not-only: ">
      <div className="flex gap-2 items-center bg-zinc-800 text-white px-4">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh9ZR7j2Oi5JHGSIe2mt2cgeVlwQb4mXg3kXIaPgEJQ&s=10" /> */}
            <img src={selectedUser?.profilePhoto} alt="User"/>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2">
            {/* <p className="text-sm">{selectedUser?.fullName}</p> */}
            <p className="text-sm">{selectedUser?selectedUser.fullName: "Select some users"}</p>
          </div>
        </div>
      </div>
      <Messages />
        <SendInput/>
    </div>

      ):(
        <div className=" flex flex-col justify-center text-center">
          <div>
            {authUser && <h2 className="text-4xl text-white font-bold">Hi {authUser?.fullName}</h2>}
          <h2 className="text-2xl text-white">
            Let's start conversation
            </h2>
          </div>
        </div>
      )
    }
    </>
  );
};

export default MessageContainer;
