import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({user}) => {
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.user);
    // console.log("Value from redux: ", selectedUser?._id);
    // console.log(user);
    
    // const user = props.user; // it is used 
    // console.log("Now from here: ");
    // console.log(user);
    // console.log(user.profilePhoto);
  
  function selectedUserHandler(user){


    dispatch(setSelectedUser(user));

    // console.log("this is props");
    // console.log(props)
    // console.log("you have clicked on here");

    // // console.log(props.key);
    // console.log(props.user);
  
}
  
    return (
    <>
        {/* <div className='flex gap-2 items-center hover:bg-zinc-200 rounded-sm cursor-pointer'> */}
        {/* <div onClick={()=>selectedUserHandler(user)} className='flex gap-2 items-center hover:bg-zinc-200 rounded-sm cursor-pointer'> */}
        <div onClick={()=>selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200': ''} flex gap-2 items-center hover:bg-zinc-200 rounded-sm cursor-pointer`}>
                <div className='avatar online'>
                    <div className='w-10 rounded-full m-2'>
                        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh9ZR7j2Oi5JHGSIe2mt2cgeVlwQb4mXg3kXIaPgEJQ&s=10"/> */}
                        <img src={user.profilePhoto}/>
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className="flex justify-between gap-2">
                        {/* <p className='text-sm'>Patal Mernstack</p> */}
                        {/* <p className='text-sm'>{props.user.fullName}</p> */}
                        <p className='text-sm'>{user?.fullName}</p>
                    </div>
                </div>

        </div>
    </>
  )
}

export default OtherUser