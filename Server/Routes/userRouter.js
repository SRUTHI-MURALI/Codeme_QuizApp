import express from "express";
const userRouter = express.Router();

import {userGetQuiz, userLogin, userRegister} from "../Controller/userController.js"

/**************************** User Register  *************************************/
userRouter.post("/register", userRegister);


/**************************** User Login  *************************************/
userRouter.post("/login", userLogin);

/**************************** User Note Management  *************************************/

userRouter.get("/getquiz",  userGetQuiz); 


export default userRouter;
