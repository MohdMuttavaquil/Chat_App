import { userModle } from "../Modle/userSchema.js"

const userToSocketId = new Map()

export const socketHandler = (io, socket) => {

    let loginUser = ''

    // user login
    socket.on("login", async (userName) => {
        loginUser = userName
        userToSocketId.set(userName, socket.id)
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
      
        userToSocketId.delete(loginUser)
        
        await userModle.findOneAndUpdate(
            { userName: loginUser },
            { $set: { messages: [] } },
            { new: true }
        );

    })

}