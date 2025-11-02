import express from "express"
import { login, singin } from "../controllor/userController.js"

const userRoute = express.Router()

userRoute.post("/singin", singin)
userRoute.post("/login", login)

export default userRoute