import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setMessage as setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const[message, setMessage] = useState("");
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=> store.user);
  const {messages} = useSelector(store=> store.message);
  // if(!message) return; // done by me
  // console.log("This is old message: ", messages);
  // console.log("This is old message: ", messages?.conversation.messages);
  // console.log("selectedUser in message Input: ", selectedUser);
  // console.log("selectedUser in message Input: ", selectedUser?._id);

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`http://localhost:3000/api/v1/message/send/${selectedUser?._id}`, {message},{
        headers:{
          'Content-Type': 'application/json' // not cumpolsory 
        },
        withCredentials: true // it is needed because middleware is used in backend
    });
      // console.log("Respponse in message input: ", res.data.newMessage);

      // dispatch(setMessage(...messages?.conversation?.messages, res?.data?.newMessage));
      dispatch(setMessages([...messages, res?.data.newMessage]))

    } catch(error){
      console.log("Error occurs: ", error);
    }
    setMessage("");
  }

  return (
    <form onSubmit={onSubmitHandler} action="" className="py-4 my-3">
      <div className="w-full relative">
        <input
        value={message}
        onChange={(e)=> setMessage(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="border text-sm rounded-lg block w-full bg-gray-600 p-2 border-zinc-500 text-white"
        />
        <button type="submit" className="absolute flex end-0 inset-y-0 items-center pr-4">
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
