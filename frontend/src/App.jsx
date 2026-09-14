import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Report from "./components/Report";
import Test from "./components/Test";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "./redux/userSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Report />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);
const App = () => {
  // can also add set loading feature
  // to make app that works even when page refresh  that is authUser we get from backend using cookie from browser
  const dispatch = useDispatch();
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/me", {
          withCredentials: true,
        });

        console.log("From here ");
        console.log(res);
        dispatch(setAuthUser(res.data));
      } catch (error) {
        console.log("User is not logged in");
        console.log("Error: ", error); // commented this
      }
    };
    getCurrentUser();
  }, [dispatch]); // give dispatch empty can also workd

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
