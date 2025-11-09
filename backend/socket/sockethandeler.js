import { userModle } from "../Modle/userSchema.js"

const userToSocketId = new Map()
let loginUser = ''

export const socketHandler = (io, socket) => {

    // user login
    socket.on("login", async (userName) => {
        loginUser = userName
        console.log(loginUser)
       userToSocketId.set(userName, socket.id)
        console.log(userToSocketId)
    })

    // For message 
    socket.on("send_message", async ({ toUserName, message, sendUser }) => {
        const targetSocketId = userToSocketId.get(toUserName);

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


   // for disconnect user 
    socket.on("disconnect", async () => {
      
        await userModle.findOneAndUpdate(
            { userName: loginUser },
            { $set: { messages: [] } },
            { new: true }
        );

        console.log(`${loginUser} disconnected`)
    })

}