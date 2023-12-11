import express from "express";
const adminRouter = express.Router();


import {adminLogin,userDetails,approveUser,unApproveUser,getQuiz,addQuiz,editQuiz,deleteQuiz,unDeleteQuiz} from "../Controller/adminController.js"



/**************************** User Login  *************************************/
adminRouter.post("/login", adminLogin); 

/**************************** User Note Management  *************************************/

adminRouter.get("/getHome",  userDetails);
adminRouter.put("/approveUser/:id",  approveUser);
adminRouter.put("/unApproveUser/:id",  unApproveUser);
adminRouter.get("/getQuiz",  getQuiz);
adminRouter.post("/addQuiz",  addQuiz);
adminRouter.put("/editQuiz/:id",  editQuiz);
adminRouter.put("/deleteQuiz/:id",  deleteQuiz);
adminRouter.put("/unDeleteQuiz/:id",  unDeleteQuiz);


export default adminRouter;
