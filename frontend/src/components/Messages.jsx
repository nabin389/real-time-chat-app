import React from 'react'
import Message from './Message'
import { useSelector } from 'react-redux'
import useGetOtherUser from '../hooks/useGetOtherUser'

const Messages = () => {
  // my custom hook
  useGetOtherUser();
  const {otherUsers} = useSelector(store=>store.user);
  return (
    <div className='px-1 flex-1 overflow-auto '>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        {/* <Message/> */}
        {/* <Message/> */}
        {/* <Message/> */}
        {/* <Message/> */}
    </div>
  )
}

export default Messages