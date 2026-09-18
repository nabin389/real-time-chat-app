

// this is with multer 


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  // for multer 
  const [file, setFile] = useState(null);

  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender }); //spread operator gives old data while inserting new data normally old data get overwrite and it prevent this so that we can get old data
  };
  // const mypratice = ()=>{
  //   e.preventDefault();
  //   // connect to backend
  //   axios.post("http://localhost:3000/api")
  //   .then((result)=>{
  //     console.log("Result", result);
  //   })
  //   .catch((error) => {
  //     console.log("Error: ",error);
  //   })
  // }
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // for multer 
    const formData = new FormData();
    formData.append("user", JSON.stringify(user));
    formData.append("profilePhoto", file);

    console.log("Data on UI:", formData);
    console.log("Data on UI:", user);
    console.log("Data on UI:", file);

    // return;
    // connect with backend
    // return;
    try {
      const res = await axios.post(
        "https://real-time-chat-app-1-ueft.onrender.com/api/v1/user/register",
        // user,
        formData,
        {
          // headers: {
          //   "Content-Type": "application/json",
          // },
          withCredentials: true,
        },
      );

      // console.log("Data comes from backend: ", res);
      // return;

      if(res.status){
        console.log()
      console.log("Response while signup: : ", res);
      toast.success(res.data.message);
      navigate("/login");
      }

      // console.log("Response: ", res);

    } catch (error) {
      console.log("Error has occured: ", error);
      toast.error(error.response.data.message);
      console.log("Error has occured: ", error);
    }
    // console.log(user);
    // setUser({
    //   fullName: "",
    //   username: "",
    //   password: "",
    //   confirmPassword: "",
    //   gender: "",
    // });
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-xs p-5 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-xl font-bold text-center mb-3">Signup</h1>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-2">
          <input
            value={user.fullName}
            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
            className="w-full h-9 px-3 text-sm rounded-sm border border-gray-300 bg-white/80"
            type="text"
            placeholder="Full Name"
          />
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full h-9 px-3 text-sm rounded-sm border border-gray-300 bg-white/80"
            type="text"
            required
            placeholder="Username"
          />
          <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full h-9 px-3 text-sm rounded-sm border border-gray-300 bg-white/80"
            type="text"
            required
            placeholder="Email"
          />
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full h-9 px-3 text-sm rounded-sm border border-gray-300 bg-white/80"
            type="password"
            required
            placeholder="Password"
          />
          <input
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            className="w-full h-9 px-3 text-sm rounded-sm border border-gray-300 bg-white/80"
            type="password"
            required
            placeholder="Confirm Password"
          />

          <div className="flex items-center justify-center gap-6 py-1 text-sm">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                name="gender"
              />
              Male
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                name="gender"
              />
              Female
            </label>


             {/* <input
            className="w-full h-9 px-3 text-sm rounded-sm border border-gray-300 bg-white/80"
            type="file"
            onChange={(e)=> setFile(e.target.files[0])}
            placeholder="Profile Picture"
          /> */}

<div className="flex flex-col items-center py-2">
  <label className="relative cursor-pointer group">
    {/* Profile Preview */}
    <div className="w-15 h-15 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100 flex items-center justify-center group-hover:border-blue-500 transition">
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt="Profile Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-gray-400 text-xs">Add Photo</span>
      )}
    </div>

{/* Small Camera Button */}


<input
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => setFile(e.target.files[0])}
/>

  </label>

  <p className="text-xs mt-1">
    Choose profile picture
  </p>
</div>



            
          </div>

          <p className="text-center text-xs">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              login
            </Link>
          </p>

          <button
            type="submit"
            className="w-full h-9 mt-1 text-sm font-medium rounded-sm border border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

