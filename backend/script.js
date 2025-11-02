import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { dbConnect } from './Config/Database.js'
import userRoute from './Routes/userroute.js'
import { contectRoute } from './Routes/contectRoute.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { socketHandler } from './socket/sockethandeler.js'

const app = express()
const PORT  = 3000

// For socket.io
const server = createServer(app)
const io = new Server(server, {
  cors:{
    rigin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
})

// Database connaction
dbConnect()

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoute)
app.use("/api/contect", contectRoute)

app.get("/", (req, res)=>{
    res.send("server is live ")
})

io.on("connection", (socket)=> socketHandler(io, socket))

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});