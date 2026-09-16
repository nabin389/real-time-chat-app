import React, { useState } from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import useGetOtherUser from '../hooks/useGetOtherUser'
import useGetMessages from '../hooks/useGetMessages'
import TestForFirstUser from './TestForFirstUser'

const Messages = () => {
  // my custom hook
  // useGetOtherUser(); //   not need
  // const {otherUsers} = useSelector(store=>store.user); // not need

  // now important: 
  useGetMessages();  // call the function inside hook
  const {messages} = useSelector(store => store.message);
  const {selectedUser} = useSelector(store=> store.user);
  // console.log("selected user: ", selectedUser);
  // console.log("Here it is  inside messages: ", messages);
  // if(!messages) return; // by changing this i have done below logic
  if(!messages){ // done by me and it is working
    return(
      <div className='px-1 flex-1 overflow-auto '>
        <TestForFirstUser name={selectedUser?.fullName}/>
      </div>
    )
  }
  // if(!messages.conversation) return;

  // console.log("Inside Messages: ", messages.conversation);
  // console.log("Inside Messages: ", messages);
  return (
    // this was old 
    // <div className='px-1 flex-1 overflow-auto '>
    
    // new taking this new
    // <div className='px-1 sm:px-4 sm:bg-white lg:px-7 lg:bg-pink-600 xl:px-10 xl:bg-purple-700 2xl:px-20px 2xl:bg-green-900  flex-1 overflow-auto bg-black '>
    <div className='px-1 sm:px-4 lg:px-7  xl:px-10 2xl:px-20px  flex-1 overflow-auto '>
      {
        // messages.conversation.messages.map((message)=>{
        //   return(
        //     <Message key={message._id} message={message.message}/>
        //   )
        // })

        // messages && messages.map((message)=>{
        messages.map((message)=>{
          return(
            // <Message key={message._id} message={message.message}/>
            <Message key={message._id} message={message}/>
          )
        })
        
      }
        {/* <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/> */}
        {/* <Message/> */}
        {/* <Message/> */}
        {/* <Message/> */}
        {/* <Message/> */}
    </div>
  )
}

export default Messages