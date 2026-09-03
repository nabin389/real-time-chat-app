// import React from 'react'

// const OtherUsers = () => {
//   return (
//     <div>
//         <div className='flex gap-2 items-center hover:bg-zinc-200 rounded-sm cursor-pointer'>
//                 <div className='avatar online'>
//                     <div className='w-12 rounded-full'>
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh9ZR7j2Oi5JHGSIe2mt2cgeVlwQb4mXg3kXIaPgEJQ&s=10"/>
//                     </div>
//                 </div>

//                 <div className='flex flex-col flex-1'>
//                     <div className="flex justify-between gap-2">
//                         <p>Patal Mernstack</p>
//                     </div>
//                 </div>

//         </div>
//     </div>
//   )
// }

// export default OtherUsers






















import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUser from '../hooks/useGetOtherUser'
import { useSelector } from 'react-redux';

const OtherUsers = () => {
  // my custom hook 
  useGetOtherUser();
  const {otherUsers} = useSelector((store)=>store.user); // both are same (this is destructuring)
  // const otherUsers = useSelector((state)=>state.user.otherUsers); (directly accessing the property)
  console.log("Hello world")
  console.log(otherUsers);

//   otherUsers.forEach((user) => {
//   console.log(user);
  
//  });

console.log("I am testing this foreach");


 if(otherUsers){
  console.log("it contains values");
  otherUsers.forEach((user) => {
    console.log("One user: ", user);
  })
}

  if(!OtherUsers) return; // early return in react
  
  return (
    <div className='overflow-auto'>
      {
        otherUsers?.map((user)=>{
          return(
            <OtherUser key={user._id} user={user}/>
          )
        })
      }
        {/* <OtherUser />
        <OtherUser />
        <OtherUser />
        <OtherUser />
        <OtherUser />
        <OtherUser />
        <OtherUser />
        <OtherUser />
        <OtherUser />
        <OtherUser /> */}
    </div>
  )
}

export default OtherUsers