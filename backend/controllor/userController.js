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
         return res.json({ success: false, massege: "chose unique username" })
      }

      if (!password > 8) {
         res.json({ success: false, massege: "enter string password" })
      }

      if (!validator.isEmail(email)) {
         return res.json({ success: false, massege: "enter valid email" })
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      const user = new userModle({ email: email, password: hashPassword, userName: userName })
      await user.save()
      const token = createToken(user._id)

      const userData = user.userName
      const userContect = user.friend
      res.json({ success: true, token, userData, userContect })

   } catch (error) {
      console.log(error)
      res.json({ success: false, massege: "some server error" })
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
            return res.json({ success: false, massege: "userName and password dose not match" })
         }
         const token = createToken(exist._id)

         const userData = exist.userName
         const userContect = exist.friend
        
         res.json({ success: true, token, userData, userContect })
      }

      if (!exist) {
         res.json({ success: false, massege: 'user dose not exist' })
      }
   } catch (error) {
      console.log(error)
      res.json({ success: false, massege: "some error" })
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
      res.json({ success: true, massege: "server error" })
   }

}

export { login, singin, userInfo }