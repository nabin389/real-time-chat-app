import {configureStore} from "@reduxjs/toolkit";
import  userReducer from "./userSlice.jsx";


const store = configureStore({
    reducer:{ // take all things like collection in each slide
        user:userReducer
    }
});
export default store;