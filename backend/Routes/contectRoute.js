import express from 'express'
import { addUser, searchUser } from "../controllor/contectController.js";
import { authMiddleware } from '../Middelwear/auth.js';
import { userInfo } from '../controllor/userController.js';

const contectRoute = express.Router()

contectRoute.post("/search", searchUser)
contectRoute.post("/add", authMiddleware, addUser)
contectRoute.get("/info", authMiddleware, userInfo)

export {contectRoute}