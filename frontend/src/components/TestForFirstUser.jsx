import React from 'react'

const TestForFirstUser = ({name}) => {
  console.log("user name is: ", name);
  return (
    <div className="h-full flex justify-center items-center">
    <h2 className='text-2xl text-white text-center'>
        {/* Let's start conversation */}
        {/* Your can start conversation here. */}
        Start a conversation with{" "}
        <span className='font-semibold text-indigo-500 cursor-pointer'>{name}</span>
        </h2>
        
</div>
  )
}

export default TestForFirstUser