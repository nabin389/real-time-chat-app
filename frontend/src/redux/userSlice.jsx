import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        authUser:null,
        otherUsers: null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOtherUsers:(state, action)=>{
            state.otherUsers = action.payload;
            // console.log("this is setother users", action.payload);
            // console.log("state.otherUsers: ", state.otherUsers)
        }
    }
});

export const {setAuthUser, setOtherUsers} = userSlice.actions;
export default userSlice.reducer;