import { io } from 'socket.io-client'

// const url = "http://localhost:3000"
  const url = "https://api2.stylevibe.fun"
  
export const socket  = io(url, { 
  autoConnect: false,
  reconnection: false
})