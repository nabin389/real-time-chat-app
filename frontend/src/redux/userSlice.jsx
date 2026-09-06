import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        authUser:null,
        otherUsers: null,
        selectedUser: null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOtherUsers:(state, action)=>{
            state.otherUsers = action.payload;
            // console.log("this is setother users", action.payload);
            // console.log("state.otherUsers: ", state.otherUsers)
        },
        setSelectedUser:(state, action)=>{
            state.selectedUser = action.payload;
            // console.log("this is setSelecteduser: ", action.payload);
            // console.log("selectedUser: ", state.selectedUser);
            
        }
    }
});

export const {setAuthUser, setOtherUsers, setSelectedUser} = userSlice.actions;
export default userSlice.reducer;