import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useGetOtherUser = () => {
  const navigate = useNavigate(); // to navigate into login page if user is not authenticated
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        // get other user
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://real-time-chat-app-1-ueft.onrender.com/api/v1/user/");

        console.log("Dont know: ", res);

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
        // console.log("response comes from backend");
        // console.log(res.data);
        //store
        console.log("data comes for other users");
        // note if user is not authenticated then status comes false then display on tost
        // then navigate to login
        if(res.data.success === false){
          console.log("this is success:", res.data.success);
          toast.error(res.data.message);
          navigate('/login');
          return;
        }

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