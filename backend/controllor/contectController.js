import { userModle } from "../Modle/userSchema.js";

const searchUser = async (req, res) => {

    const { search } = req.body
    try {
        const exist = await userModle.findOne({ userName: search })

        if (!exist) {
          return  res.json({ success: false, massege: "user not exist" })
        }

        const foundUser = exist.userName
        res.json({ success: true, foundUser })
    } catch (error) {
        console.log(error)
        res.json({ success: true, massege: "server error" })
    }

}

const addUser = async (req, res) => {

    const { foundUser } = req.body
    try {

        const sendUser = await userModle.findById(req.body.id)
        const reciveUser = await userModle.findOne({ userName: foundUser })

       if (sendUser.friend.includes(foundUser)) {
       return res.json({success: false, massege:"user already add"})
       }

        sendUser.friend.push(foundUser)
        await sendUser.save()

        reciveUser.friend.push(sendUser.userName)
        await reciveUser.save()
        
        const userContect = sendUser.friend
        res.json({success: true, userContect})
    } catch (error) {
        console.log(error)
        res.json({ success: false, massege: "server error" })
    }
}

export { searchUser, addUser }