import express from "express";
const userRouter = express.Router();

import {userGetQuiz, userLogin, userRegisterSendOtp, userRegisterVerifyOtp} from "../Controller/userController.js"

/**************************** User Register  *************************************/
userRouter.post("/register", userRegisterSendOtp);
userRouter.post("/verifyOtp", userRegisterVerifyOtp);

/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);

/**************************** User Note Management  *************************************/

userRouter.get("/getquiz",  userGetQuiz); 


export default userRouter;
