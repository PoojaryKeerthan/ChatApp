import React, { use, useEffect, useRef, useState } from 'react'
import { MdSend } from 'react-icons/md'
import useChatContext from '../Context/ChatContext';
import {useNavigate} from 'react-router'
import { baseurl } from '../config/AxiosHelper';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import toast from 'react-hot-toast';
import { getAllRoomMessages } from '../Services/RoomService';
import  {timeAgo}  from '../config/timeAgoHelper'


const ChatPage = () => {
    const {roomId,currentUser,Connected,setConnected,setRoomId,setCurrentUser} = useChatContext();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [roomid, setRoomID] = useState(null);
    const [CurrentUser,setCurrentUSer] = useState(currentUser)
    const inputref = useRef(null);
    const chatBoxRef = useRef(null);
    const navigate  = useNavigate();

    useEffect(()=>{
        if(!Connected){
            navigate('/')
        }
    },[roomId,currentUser,Connected])

    //connection to stomp

    useEffect(()=>{
        const ConnectWebSocket =()=>{
            const socket = new SockJS(`${baseurl}/chat`);
            const client = Stomp.over(socket)
            client.connect({},()=>{
                setStompClient(client);
                toast.success('Connected to the chat server');
                client.subscribe(`/topic/room/${roomId}`,(message)=>{
                    const newMessage = JSON.parse(message.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                })
            });
        }
        if(Connected) ConnectWebSocket()
    },[roomId])

    //load old messages
    useEffect(() => {
        async function loadMessages() {
            try {
              const messages = await getAllRoomMessages(roomId)
              setMessages(messages);
              
            } catch (error) {
                console.log(error);
                
            }
        }
     if(Connected) loadMessages();
    },[])

    //send messages
    const sendMessages=async()=>{
            if(stompClient && Connected && input.trim()){
               const message={
                sender:CurrentUser,
                content:input,
                roomId:roomId,
               }
            stompClient.send(`/app/sendMessage/${roomId}`,{}, 
                JSON.stringify(message));
            setInput('');
            }
    }

    //scroll down
    useEffect(() => {
            if(chatBoxRef.current){
                chatBoxRef.current.scroll({
                    top:chatBoxRef.current.scrollHeight,
                    behavior:'smooth'
                })
            }
    },[messages])

    //logout function
    function handleLogout(){
        stompClient.disconnect()
        setConnected(false)
        setRoomID('')
        setCurrentUSer('')
        navigate('/')
    }
    

    return (
// header part
<div className=''>
  <header className='fixed w-full border-gray-700 h-16 md:h-20 bg-gray-700 py-3 md:py-5 shadow flex justify-between items-center px-3 md:px-6 z-10'>
    <div className='flex-1 min-w-0'>
      <h1 className='text-sm md:text-xl font-semibold truncate'>
        Room: <span className='text-blue-300'>{roomId}</span>
      </h1>
    </div>
    <div className='flex-1 min-w-0 text-center'>
      <h1 className='text-sm md:text-xl font-semibold truncate'>
        User: <span className='text-green-300'>{currentUser}</span>
      </h1>
    </div>
    <div className='flex-1 min-w-0 flex justify-end'>
      <button
        onClick={handleLogout}
        className='cursor-pointer bg-red-500 hover:bg-red-700 px-2 py-1 md:px-3 md:py-2 rounded-full text-sm md:text-base transition-colors duration-200'
      >
        <span className='hidden sm:inline'>Leave Room</span>
        <span className='sm:hidden'>Leave</span>
      </button>
    </div>
  </header>

  {/* Message display */}
  <main
    ref={chatBoxRef}
    className='pt-16 md:pt-20 pb-20 md:pb-24 px-3 md:px-10 w-full md:w-2/3 bg-slate-800 h-screen overflow-y-auto mx-auto'
    style={{ scrollBehavior: 'smooth' }}
  >
    {messages.map((message, index) => (
      <div key={index} className={`flex ${message.sender === CurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`${message.sender === CurrentUser ? 'bg-white text-black' : 'bg-gray-500 text-white'} rounded-lg max-w-[85%] sm:max-w-xs md:max-w-md p-3 shadow-md`}>
          <div className='flex flex-row'>
            <img 
              className="h-8 w-8 md:h-10 md:w-10 mr-2 md:mr-4 rounded-full flex-shrink-0" 
              src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
              alt="Avatar"
            />
            <div className='flex flex-col gap-1 min-w-0'>
              <p className='text-xs md:text-sm font-bold truncate'>{message.sender}</p>
              <p className='text-sm md:text-base break-words'>{message.content}</p>
              <p className='text-xs text-gray-400'>{timeAgo(message.timestamp)}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </main>

  {/* Input message */}
  <div className="fixed bottom-0 left-0 right-0 p-3 md:p-4 bg-slate-900 md:bg-transparent">
    <div className='w-full md:w-2/3 mx-auto bg-gray-700 rounded-lg md:rounded-xl p-3 md:p-4 flex items-center gap-3 shadow-lg'>
      <input 
        value={input}
        onKeyDown={(e) => {if(e.key === 'Enter') sendMessages()}}
        onChange={(e) => setInput(e.target.value)}
        type="text" 
        placeholder='Type your message...' 
        className='flex-1 bg-gray-600 text-white placeholder-gray-300 px-3 py-2 md:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base'
      />
      <button
        onClick={sendMessages}
        className='bg-green-500 hover:bg-green-600 active:bg-green-700 h-10 w-10 md:h-12 md:w-12 flex justify-center items-center rounded-full cursor-pointer transition-all duration-200 flex-shrink-0'
      >
        <MdSend size={16} className='md:hidden' />
        <MdSend size={20} className='hidden md:block' />
      </button>
    </div>
  </div>
</div>
    )
}

export default ChatPage