import React from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import useGetOtherUser from '../hooks/useGetOtherUser'
import useGetMessages from '../hooks/useGetMessages'

const Messages = () => {
  // my custom hook
  // useGetOtherUser(); //   not need
  // const {otherUsers} = useSelector(store=>store.user); // not need

  // now important: 
  useGetMessages();  // call the function inside hook
  const {messages} = useSelector(store => store.message);
  // console.log("Here it is : ", messages);
  if(!messages) return;
  if(!messages.conversation) return;

  // console.log("Inside Messages: ", messages.conversation);
  // console.log("Inside Messages: ", messages);
  return (
    <div className='px-1 flex-1 overflow-auto '>
      {
        messages.conversation.messages.map((message)=>{
          return(
            <Message key={message._id} message={message.message}/>
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