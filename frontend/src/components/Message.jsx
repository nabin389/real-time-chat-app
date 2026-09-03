import React from "react";

const Message = () => {
  return (
    <div>
      <div className="chat chat-end ">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
            />
          </div>
        </div>

        <div className="chat-header">
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble bg-zinc-200 text-sm">
          You were the Chosen One!
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
