import { Children, createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider=({children})=>{
    const [roomId,setRoomId] = useState('');
    const [currentUser,setCurrentUser] = useState('');
    const [Connected,setConnected] = useState(false);
    
    return <ChatContext.Provider
        value={{roomId,currentUser,Connected,setConnected,setRoomId,setCurrentUser}}
    >
        {children}
        </ChatContext.Provider>
} 

const useChatContext = () => useContext(ChatContext);
export default useChatContext;