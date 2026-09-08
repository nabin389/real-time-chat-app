import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({message}) => {
  const scroll = useRef();
  const {authUser, selectedUser} = useSelector(store => store.user);

  // do it later after the completion of basic things 
  // console.log("This is auth user: ", authUser)
  // console.log("This is message: ", message);
  // const isSender = authUser?._id === message?.senderId;
  // console.log("This is result --> ", isSender);


  // testing 
  // useEffect(()=>{
  //   console.log("Auth user changed: ", authUser);
  // }, [authUser]);

  
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:'smooth'}) // that is used to update scroll 
  },[message])
  return (
    <div>
      {/* <div ref={scroll} className="chat chat-end "> */}
      <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end': 'chat-start'} `}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              // src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"

              // this work if page doesnot refresh 
              // src={message.senderId === authUser?._id? authUser?.profilePhoto: selectedUser?.profilePhoto}

              // this is for this time 
             src = {message?.senderId === authUser?._id?
              authUser?.profilePhoto:
              !authUser?._id ?
              "https://img.daisyui.com/images/profile/demo/kenobee@192.webp":
              selectedUser?.profilePhoto
             }
            />
          </div>
        </div>

        <div className="chat-header">
          <time className="text-xs opacity-50">12:45</time>
        </div>
        {/* <div className="chat-bubble bg-zinc-200 text-sm">
          You were the Chosen One!
        </div> */}
        <div className="chat-bubble bg-zinc-200 text-sm">
          {message.message}
          {/* {message? message:<h2>message</h2>} */}
        </div>
      </div>
    </div>
  );
};

export default Message;

// import React from "react";

// const Message = () => {
//   return (
//     <div>
//       <div className="chat chat-start ">
//         <div className="chat-image avatar">

//           <div className="w-8 rounded-full m-2">
//             <img
//               //  className='w-10 rounded-full m-2'
//               alt="Tailwind CSS chat bubble component"
//               src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
//             />
//           </div>
//         </div>

//         {/* <div className="chat-header">
//         Obi-Wan Kenobi
//         <time className="text-xs opacity-50">12:45</time>
//       </div> */}
//         {/* <div className="flex flex-col flex-1"> */}
//           {/* <div className="flex gap-2 items-center"> */}
//             <div className="chat-bubble bg-zinc-200 text-sm">You were the Chosen One! hello world this is the </div>
//             <div className="chat-footer opacity-50">Delivered</div>
//           {/* </div> */}
//         {/* </div> */}
//       </div>
//     </div>
//   );
// };

// export default Message;
