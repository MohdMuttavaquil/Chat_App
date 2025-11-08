import { userModle } from "../Modle/userSchema.js"

const userToSocketId = new Map()
let loginUser = ''

export const socketHandler = (io, socket) => {

    // user login
    socket.on("login", async (userName) => {
        loginUser = userName
       userToSocketId.set(userName, socket.id)
        console.log(userToSocketId)
    })

    // For message 
    socket.on("send_message", async ({ toUserName, message, sendUser }) => {
        const targetSocketId = users[toUserName];

        if (targetSocketId) {
            io.to(targetSocketId).emit("receive_message", {
                from: sendUser,
                message,
            });
           
        } else {
            // for offline user 

            const msg = { from: sendUser, message: message }
            const reciveUser = await userModle.findOne({ userName: toUserName })
            reciveUser.messages.push(msg)
            await reciveUser.save()
        }

    })

    // For video call
    socket.on("join-room", (roomId)=>{
        socket.join(roomId)
        socket.id = userToSocketId.get(loginUser)
        socket.to(roomId).emit("peer-join", socket.id)
    })

    socket.on("offer", ({ roomId, desc }) => {
    socket.to(roomId).emit("offer", { from: loginUser, desc });
  });

  socket.on("answer", ({ roomId, desc }) => {
    socket.to(roomId).emit("answer", { from: loginUser, desc });
  });

  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit("ice-candidate", { from: loginUser, candidate });
  });

  socket.on("leave", (roomId) => {
    socket.leave(roomId);
    socket.to(roomId).emit("peer-left", loginUser);
  });


   // for disconnect user 
    socket.on("disconnect", async () => {
      
        await userModle.findOneAndUpdate(
            { userName: loginUser },
            { $set: { messages: [] } },
            { new: true }
        );

        console.log("user disconnected")
    })

}