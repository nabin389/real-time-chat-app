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


import React, { useEffect } from 'react'
import Slidebar from './Slidebar'
import MessageContainer from './MessageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate = useNavigate();
  const {authUser} = useSelector(store=>store.user);

console.log("at first: ", authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get("https://real-time-chat-app-1-ueft.onrender.com/api/v1/user/me", {
          withCredentials: true,
        });


         if(res?.data?.success === false){
                  console.log("this is success:", res.data.success);
                  // toast.error(res?.data?.message);
                  navigate('/login');
                  return;
                }
        
        // console.log("From here ");
        // console.log(res);
        // console.log("this is the response of current user: ", res.data);
        dispatch(setAuthUser(res.data));

      } catch (error) {
        console.log("User is not logged in");
        console.log("Error: ", error); // commented this
      }
    };
    getCurrentUser();
  }, [dispatch]); // give dispatch, empty can also work


console.log("at second: ", authUser);



  if(!authUser){
   return(
    <div className='text-3xl'>Loading...</div>
   )
  }


  return (

    //  data seen on the top of page 
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
        {/* this was new only for testing  */}
      {/* <div className='flex h-[80vh] w-full sm:w-[70%] rounded-lg overflow-hidden bg-red-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 shadow-2xl'> */}
        <Slidebar />
        <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage