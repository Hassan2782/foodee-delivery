import express from "express"
import { loginUser,registorUser } from "../controllers/user-controller.js"


const userRouter =express.Router()


userRouter.post("/register",registorUser)
userRouter.post("/login",loginUser)



export default userRouter
