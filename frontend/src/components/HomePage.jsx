// import React from 'react'
// import Slidebar from './Slidebar'
// import MessageContainer from './MessageContainer'
// import { Link } from 'react-router-dom'

// const HomePage = () => {
//   return (
//     <div className='flexIsm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop:filter backdrop:blur-lg bg-opacity-0'>
//       Home Page
//       <Slidebar/>
//       <MessageContainer/>

//     </div>
//   )
// }

// export default HomePage


import React from 'react'
import Slidebar from './Slidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <div className='flex items-center justify-center h-screen w-screen overflow-y-auto py-4'>
    {/* // <div className='flex flex-col items-center justify-center h-screen w-screen overflow-y-auto py-4'>
    //   <div>Hi user</div> */}
      <div className='flex h-[80vh] w-full sm:w-[70%] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 shadow-2xl'>
        
        <Slidebar />
        <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage