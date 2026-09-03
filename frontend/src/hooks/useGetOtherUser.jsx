import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        // get other user
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:3000/api/v1/user/");

        // login
        // const res = await axios.post(
        //   "http://localhost:3000/api/v1/user/login",
        //   {
        //     username: "nabin567",
        //     password: "helloworld",
        //   },
        //   {
        //     withCredentials: true,
        //   },
        // );
        console.log("response comes from backend");
        console.log(res.data);
        //store
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log("Error has occured");
        console.log(error);
      }
    };

    fetchOtherUsers();
  }, []);
};

export default useGetOtherUser;

// import React, { useEffect } from 'react';
// import axios from 'axios';

// const useGetOtherUser = () => {
//     useEffect(() => {
//         const fetchOtherUsers = async () => {
//             try {
//                 const res = await axios.get(
//                     "http://localhost:3000/api/v1/user/",
//                     {
//                         withCredentials: true
//                     }
//                 );

//                 console.log("response comes from backend");
//                 console.log(res.data);

//             } catch (error) {
//                 console.log("Error has occurred");
//                 console.log(error);
//             }
//         };

//         fetchOtherUsers();
//     }, []);
// };

// export default useGetOtherUser;
