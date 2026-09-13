import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../redux/messageSlice';
// const useGetMessages = async() => {
const useGetMessages = () => {
    const {selectedUser} = useSelector(store => store.user); // to find id from clicked user (data comes from userSlice)
    const dispatch = useDispatch();   // to send message fetched through userid and send to reducer for centralized storage
    // if(!selectedUser) return; // done by me

    // console.log("This is Overall id: ",selectedUser?._id )
    // console.log("This is Overall data: ",selectedUser )
    // console.log("This is Overall fullname: ",selectedUser?.fullName )
    // console.log("This is Overall data: ",selectedUser?.data.message )


    useEffect(()=>{
        const fetchMessage = async()=>{
            // console.log("Before");
            try{
                axios.defaults.withCredentials=true; // because it is used if routes passes through middleware like isAuthenticated
                // const res = await axios.get(`http://localhost:3000/api/v1/message/6a8d4d1610a4aaf94074706b`);
                // const res = await axios.get(`http://localhost:3000/api/v1/message/6a8d4d1610a4aaf94074706b`);
                // console.log("Before response: ");
                // console.log(selectedUser?._id);
                const res = await axios.get(`http://localhost:3000/api/v1/message/${selectedUser?._id}`);

                // console.log("After response comes: ");
                // console.log("This: ", res.data.conversation.messages);
                // console.log("This: ", res.data);

                // dispatch(setMessage(res?.data));  // it call reducer function to store data
                dispatch(setMessage(res?.data?.conversation?.messages));  // it call reducer function to store data

                // console.log("Message: ", res?.data.message);
                // console.log("Conversation: ", res?.data.conversation.messages);
               
               
                // For each loop 
                // let messageReceive = res?.data.conversation.messages;
                // console.log("Now from here");
                // // console.log(messageReceive);
                // messageReceive.forEach(val=>{
                //     console.log(val.message);
                // })


            } catch(error){
                console.log("Error occurred: ", error);
    
            }
        }
        fetchMessage();

    // },[])
    },[selectedUser])



//   return (
//     <div>useGetMessages</div>
//   )
}

export default useGetMessages