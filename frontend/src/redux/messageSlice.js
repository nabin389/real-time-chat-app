import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState:{
        messages: null // this
    },
    reducers:{
        setMessage:(state, action)=>{
            state.messages = action.payload;
            // console.log("Inside Reducer: ", state.messages);
        }
    }
});
export const {setMessage} = messageSlice.actions;
export default messageSlice.reducer;











