import React from 'react'

const OtherUser = () => {
  return (
    <div>
        {/* <div className='flex gap-2 items-center hover:bg-zinc-200 rounded-sm cursor-pointer'> */}
        <div className='flex gap-2 items-center hover:bg-zinc-200 rounded-sm cursor-pointer'>
                <div className='avatar online'>
                    <div className='w-10 rounded-full m-2'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh9ZR7j2Oi5JHGSIe2mt2cgeVlwQb4mXg3kXIaPgEJQ&s=10"/>
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className="flex justify-between gap-2">
                        <p className='text-sm'>Patal Mernstack</p>
                    </div>
                </div>

        </div>
    </div>
  )
}

export default OtherUser