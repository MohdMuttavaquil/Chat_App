import { userModle } from "../Modle/userSchema.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const createToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET)
}

// User ragidtration
const singin = async (req, res) => {

   const { email, userName, password } = req.body;

   try {

      const exist = await userModle.findOne({ userName })
      if (exist) {
         return res.json({ success: false, message: "chose unique username" })
      }

      if (!password > 8) {
         res.json({ success: false, message: "enter strong password" })
      }

      if (!validator.isEmail(email)) {
         return res.json({ success: false, message: "enter valid email" })
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      const user = new userModle({ email: email, password: hashPassword, userName: userName })
      await user.save()
      const token = createToken(user._id)

      const userData = user.userName
      const userContect = user.friend
      const messages = user.messages

      res.json({ success: true, token, userData, userContect, messages })

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: "some server error" })
   }
}

// user login 
const login = async (req, res) => {
   const { userName, password } = req.body

   try {

      const exist = await userModle.findOne({ userName })
      if (exist) {
         const isUser = await bcrypt.compare(password, exist.password)

         if (!isUser) {
            return res.json({ success: false, message: "userName and password dose not match" })
         }
         const token = createToken(exist._id)

         const userData = exist.userName
         const userContect = exist.friend
         const messages = exist.messages

         res.json({ success: true, token, userData, userContect, messages })
      }

      if (!exist) {
         res.json({ success: false, message: 'user dose not exist' })
      }
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: "some error" })
   }
}


const userInfo = async (req, res) => {

   const user = await userModle.findById(req.body.id)

   try {
      const userData = user.userName
      const userContect = user.friend
      const messages = user.messages
      res.json({ success: true, userData, userContect, messages })
   } catch (error) {
      console.log(error)
      res.json({ success: true, message: "server error" })
   }

}

export { login, singin, userInfo }