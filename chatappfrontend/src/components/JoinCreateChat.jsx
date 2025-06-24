import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { crerateRoom, joinChatApi } from '../Services/RoomService';
import useChatContext from '../Context/ChatContext';
import {useNavigate} from 'react-router'


const JoinCreateChat = () => {
  const {roomId,currentUser,setRoomId,setCurrentUser,Connected,setConnected} = useChatContext();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    roomId: '',
    userName: ''
  });
  const [loading,setLoading] = useState(false);
  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })

  }


  function validateInput() {
    if (!userDetails.userName || !userDetails.roomId) {
      toast.error("Please fill all the fields");
      return false;
    }
    return true;
  }

 async function handleJoinRoom() {
    if (!validateInput()) return;
    try {
      setLoading(true);
      const room = await joinChatApi(userDetails.roomId)
      toast.success("Joined succesfully..")
      setCurrentUser(userDetails.userName);
      setRoomId(room.roomId);
      setConnected(true);
      navigate('/chat');
    } catch (error) {
      setLoading(false);
      console.log(error);
      if(error.status === 400){
        toast.error(error.response.data)
      }
      else toast.error("error in joining..!")
    }
    finally{
      setLoading(false)
    }
  }


  async function handleCreateRoom () {
    if (!validateInput()) return;
    setLoading(true);
    try {
      const response  = await crerateRoom(userDetails.roomId)
      console.log(response);
      toast.success("Room created successfully");
      setCurrentUser(userDetails.userName);
      setRoomId(response.roomId);
      setConnected(true);
      navigate('/chat')
    } catch (error) {
      console.log(error);
      setLoading(false);
      if(error.status === 400) toast.error("Room Already exists!")
      else  toast.error("Error creating room");
    }
    finally{
      setLoading(false);
    }
  }



  return (
    <div className=' min-h-screen flex items-center justify-center'>
      <div className='flex flex-col border-gray-700 border gap-5 p-8 w-full max-w-md rounded bg-gray-800'>
        <h1 className='text-2xl font-semibold text-center'>Join Room or Create Room</h1>
        <div className=''>
          <label htmlFor="" className='block font-medium mb-2'>Your Name:</label>
          <input
            value={userDetails.userName}
            type="text"
            id="name"
            name='userName'
            placeholder='Enter your name'
            className='w-full bg-gray-600 px-4 py-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            onChange={handleInputChange}
          />
        </div>
        <div className=''>
          <label htmlFor="" className='block font-medium mb-2'>RoomID / New RoomID:</label>
          <input
            type="text"
            id="roomid"
            className='w-full bg-gray-600 px-4 py-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            name='roomId'
            placeholder='Enter Room ID'
            value={userDetails.roomId}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex justify-center gap-2'>
          <button
          disabled={loading}
            onClick={handleJoinRoom}
            className='px-3 py-2 bg-blue-500 hover:bg-blue-800 cursor-pointer'>
             Join Room
              </button>
          <button
            disabled={loading}
            onClick={handleCreateRoom}
            className='px-3 py-2 bg-orange-500 hover:bg-orange-800 cursor-pointer'>
             Create Room
            </button>
        </div>

      </div>
    </div>
  )
}

export default JoinCreateChat