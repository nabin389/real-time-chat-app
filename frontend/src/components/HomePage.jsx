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
import { useSelector } from 'react-redux'
const HomePage = () => {
  const {authUser} = useSelector(store=>store.user);
  if(authUser){
    console.log("This is authUser:", authUser);

  }
  console.log("This is next");
  return (
    // <div className='flex items-center justify-center h-screen w-screen overflow-y-auto py-4'>
     <div className='flex flex-col items-center justify-center h-screen w-screen overflow-y-auto py-4'>

      <div className="mb-4">
        {
          authUser?(
          <div className="flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg transition-all duration-200 hover:bg-white/20 hover:scale-105 cursor-pointer">
            <img 
            src={authUser?.profilePhoto} 
            alt="Profile picture"
            className="w-9 h-9 rounded-full object-cover border-2 border-sky-400 shadow-sm"
             />

            <span className="font-medium text-sm tracking-wide text-gray-200">{authUser?.fullName}</span>
          </div>):(
          <h2 className="text-lg font-semibold text-gray-300">Hi User</h2>

          )}
        </div> 


      <div className='flex h-[80vh] w-full sm:w-[70%] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 shadow-2xl'>
        
        <Slidebar />
        <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage