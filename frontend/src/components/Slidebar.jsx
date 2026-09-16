import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from "../redux/userSlice";
import { setMessage } from "../redux/messageSlice";
// import Logout from "./Logout";

const Slidebar = () => {
  const [search, setSearch] = useState("");
  const {otherUsers} = useSelector(store=>store.user);
  const dispatch = useDispatch();
  // console.log(search);


  const navigate = useNavigate();

  const logoutHandler = async () => {


          // console.log("Before logout response");
          // toast.success("Hello world");
          // navigate('/login');
    try{
      console.log("Before logout response");
      const res = await axios.get('http://localhost:3000/api/v1/user/logout');
      console.log("Before logout response");
      console.log("This is: ", res);
      console.log("This is: ", res.data.message);
      toast.success(res.data.message);

      // from here all data have to delete 
       // trying to null everything at the begining to solve error by me
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setSelectedUser(null));
        dispatch(setMessage(null));

      navigate('/login');

    } catch(error){
      console.log("Error occured: ",error);
    }

  }

  const searchSubmitHandler = (e)=>{
    e.preventDefault();
    console.log(search)
    // what you have to do is dont use original like this 
    // create usestate or other concept for this 
    const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversationUser){
      dispatch(setOtherUsers([conversationUser]));  
      // console.log("This has found: ", conversationUser);
    }else{
      toast.error("User not found!");

    }
  }

  return (
    // <div className="border-r border-slate-500 p-4 flex flex-col ">
    //  taking this new 
    <div className="w-1/2 lg:w-1/3 border-r border-slate-500 p-4 flex flex-col ">
      <form onSubmit={searchSubmitHandler} action="" className="flex items-center">
        <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}

          // className='input input-bordered rounded-md'
          className="input input-bordered rounded-full w-full 
                     bg-white/90 text-gray-900 placeholder-gray-500
                     border-2 border-transparent
                     focus:border-sky-400 focus:bg-white focus:outline-none
                     shadow-md
                     transition-all duration-200"
          type="text"
          placeholder="Search..."
        />

        <button
          type="submit"
          className="btn m-2 btn-circle bg-sky-500 hover:bg-sky-600 active:scale-95
             text-white border-none shadow-md hover:shadow-lg
             transition-all duration-200 shrink-0"
        >
          <FaSearch size="18px" />
        </button>
      </form>

      <div className="divider px-3" > </div>
      <OtherUsers/>
      <div className="mt-2 ">
        {/* <button onClick={()=>{logoutHandler()}} className="btn btn-sm  bg-gray-300  border-gray-400  rounded-[7px]">Logout</button> */}

        {/* this was before hooks implementation  */}
        {/* <button onClick={logoutHandler} className="btn btn-sm  bg-gray-300  border-gray-400  rounded-[7px]">Logout</button> */}
        {/* <Logout handleLogouot={logoutHandler}/> */}
        <button onClick={logoutHandler} className="btn btn-sm  bg-gray-300  border-gray-400  rounded-[7px]">
          Logout
        </button>
      </div>

    </div>
  );
};

export default Slidebar;
