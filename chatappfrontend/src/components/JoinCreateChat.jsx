import React from 'react'

const JoinCreateChat = () => {
  return (
    <div className=' min-h-screen flex items-center justify-center'>
      <div className='flex flex-col border-gray-700 border gap-5 p-8 w-full max-w-md rounded bg-gray-800'>
            <h1 className='text-2xl font-semibold text-center'>Join Room or Create Room</h1>
            <div className=''>
                <label htmlFor="" className='block font-medium mb-2'>Your Name:</label>
                <input type="text" id="name" className='w-full bg-gray-600 px-4 py-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>
            <div className=''>
                <label htmlFor="" className='block font-medium mb-2'>RoomID / New RoomID:</label>
                <input type="text" id="roomid" className='w-full bg-gray-600 px-4 py-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>
            <div className='flex justify-center gap-2'>
                <button className='px-3 py-2 bg-blue-500 hover:bg-blue-800 cursor-pointer'>Join Room</button>
                <button className='px-3 py-2 bg-orange-500 hover:bg-orange-800 cursor-pointer'>Create Room</button>
            </div>
           
        </div>
    </div>
  )
}

export default JoinCreateChat