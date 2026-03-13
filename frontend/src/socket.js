import { io } from 'socket.io-client'

// const url = "http://localhost:3000"
  const url = "https://chat-app-jkuj.onrender.com"
  
export const socket  = io(url, { autoConnect: false})