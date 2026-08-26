// import React from "react";
// import { Link } from "react-router-dom";

// const Signup = () => {
//   return (
//     // <div className="min-w-96 mx-auto">
//    <div className="min-h-screen flex items-center justify-center px-4">
//    <div className="w-full p-6 rounded-lg shadow-md bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
//         <h1 className="text-3xl font-bold text-center">Signup</h1>
//         <form action="">
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Full Name</span>
//             </label>
//             <input
//               className="w-full input input-bordered h-10 bg-olive-500 rounded-sm"
//               type="text"
//               placeholder="FullName"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input
//               className="w-full input input-bordered h-10 bg-olive-500 rounded-sm"
//               type="text"
//               placeholder="Username"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               className="w-full input input-bordered h-10 bg-olive-500 rounded-sm"
//               type="password"
//               placeholder="Password"
//             />
//           </div>

//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Confirm Password</span>
//             </label>
//             <input
//               className="w-full input input-bordered h-10 bg-olive-500 rounded-sm"
//               type="password"
//               placeholder="Confirm Password"
//             />
//           </div>
//           <div className="flex items-center my-4">
//             <div className="flex items-center">
//               <p>Male</p>
//               <input type="checkbox" defaultChecked className="checkbox mx-2" />
//             </div>

//             <div className="flex items-center">
//               <p>Female</p>
//               <input type="checkbox" defaultChecked className="checkbox mx-2" />
//             </div>
//           </div>

//             <p className="text-center">Already have an account? <Link to="/login">signup</Link></p>

//           <div>
//             <button className="btn btn-block btn-sm mt-2 border border-slate-700">
//               Signup
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
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
    console.log("Data on UI:", user);
    // connect with backend
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if(res.status){
        // console.log()
      console.log("Response: ", res);
        navigate("/login");
        toast.success(res.data.message);
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
            placeholder="Username"
          />
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full h-9 px-3 text-sm rounded-sm border border-gray-300 bg-white/80"
            type="password"
            placeholder="Password"
          />
          <input
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            className="w-full h-9 px-3 text-sm rounded-sm border border-gray-300 bg-white/80"
            type="password"
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
