import { userModle } from "../Modle/userSchema.js"

const users = {}
let loginUser = ''

export const socketHandler = (io, socket) => {

    // user login
    socket.on("login", async (userName) => {
        loginUser = userName
        users[userName] = socket.id
        console.log("user id = ", users)
    })

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

    socket.on("disconnect", async () => {
      
        await userModle.findOneAndUpdate(
            { userName: loginUser },
            { $set: { messages: [] } },
            { new: true }
        );

        console.log("user disconnected")
    })

}