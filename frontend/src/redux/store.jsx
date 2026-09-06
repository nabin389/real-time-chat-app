import {configureStore} from "@reduxjs/toolkit";
import  userReducer from "./userSlice.jsx";
import messageReducer from "./messageSlice.js"


const store = configureStore({
    reducer:{ // take all things like collection in each slide
        user:userReducer,
        message:messageReducer
    }
});
export default store;