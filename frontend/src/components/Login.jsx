

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
// this all are added for removing all previous data of redux
// import { setAuthUser, setOtherUsers, setSelectedUser } from "../redux/userSlice";
// import { setMessage } from "../redux/messageSlice";



const Login = () => {
 

  const [user, setUser] = useState({
    username:"",
    password:""
  })

  // console.log(user.username);
  // console.log(user.password);
  // console.log(user);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleCheckbox = (gender)=> {
  //   setUser({...user, gender}) //spread operator gives old data while inserting new data normally old data get overwrite and it prevent this so that we can get old data
  // }




  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    // console.log(user);

  // useEffect(()=> { // added by me
     try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,  // for middleware like authentication middleware
        },
      );
 
 
      console.log("Response comes on login: ", res);
      toast.success(res.data.message);
      dispatch(setAuthUser(res.data));

      navigate("/");

    } catch (error) {
      console.log("error:", error.response.data.message)
      toast.error(error.response.data.message);
      console.log("Error has occured: ", error.response.data);
    }


    // }, []) //this is useeffect added by me


    setUser({
    username:"",
    password:""
  });


}
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-xs p-5 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-xl font-bold text-center mb-3">Login</h1>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-2">

          <input
          value={user.username}
          onChange={(e) => setUser({...user, username:e.target.value})}
            className="w-full h-9 px-3 text-sm rounded-sm border border-gray-300 bg-white/80"
            type="text"
            placeholder="Username"
          />
          <input
          value={user.password}
          onChange={(e)=> setUser({...user, password: e.target.value})}
            className="w-full h-9 px-3 text-sm rounded-sm border border-gray-300 bg-white/80"
            type="password"
            placeholder="Password"
          />

          <p className="text-center text-xs">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              signup
            </Link>
          </p>

          <button
            type="submit"
            className="w-full h-9 mt-1 text-sm font-medium rounded-sm border border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;