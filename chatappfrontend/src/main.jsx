import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import AppRoutes from './config/Routes'
import { Toaster } from 'react-hot-toast'
import { ChatProvider } from './Context/ChatContext'

createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
    <Toaster/>
    <ChatProvider>
      <AppRoutes/>
      </ChatProvider>
    </BrowserRouter>
 
)
