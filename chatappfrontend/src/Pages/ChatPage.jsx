import React from 'react'
import { MdSend } from 'react-icons/md'
const ChatPage = () => {
  return (
    <div className=''>
        <header className='fixed w-full border-gray-700 h-20 bg-gray-700 py-5 shadow flex justify-between items-center'>
            <div>
                <h1 className='text-xl font-semibold'>Room : <span>Family Room</span></h1>
                
            </div>

            <div>
                 <h1 className='text-xl font-semibold'>Room : <span>Family Room</span></h1>
            </div>

            <div>
                <button className='cursor-pointer bg-red-500 hover:bg-red-700 px-3 py-2 rounded-full'>Leave Room</button>
            </div>
        </header>

        {/* input message */}
        <div className="fixed bottom-2 w-full h-16 ">
            <div className='h-full px-10 flex items-center justify-between w-2/3 mx-auto bg-gray-700 rounded'>
            <input type="text" placeholder='Type your message here...' className='w-full border-gray-900 px-3 py-2 rounded  h-full focus:outline-none '/>
            <button className='bg-green-400 h-10 w-14 flex justify-center items-center   rounded-full cursor-pointer hover:bg-green-600 transition-all duration-300'>
                <MdSend size={20}/>
            </button>
            </div>
        </div>
    </div>
  )
}

export default ChatPage