import userSchema from "../Model/userModel.js";
import quizSchema from "../Model/quizModel.js"
import bcrypt from "bcrypt";
import generateOtp from "../OtpGenerator/generateOTP.js";
import verifyOtp from "../OtpGenerator/verifyOTP.js";

let globalData = {};

/**************************** User Register Send Otp *************************************/

const userRegisterSendOtp = async (req, res) => {

  try {
    const { trimmedName, trimmedEmail, trimmedPhone, trimmedPassword } = req.body;
   
    const emailfind = await userSchema.findOne({ trimmedEmail });
   
    if (emailfind) {
      res.status(400).json(" email already existing");
    } else {
      const message = "Your OTP for email verification";
      const subject = "Email Authentication Otp";
      const otp = await generateOtp(trimmedEmail, message, subject, res);
      console.log(otp,'otp');
      res.status(200).json({ message: "OTP sent successfully" });
      const saltRounds = 10;
      bcrypt.hash(trimmedPassword, saltRounds, async (err, hash) => {
        if (err) {
          res
            .status(500)
            .json("Some error occurred while hashing the password");
          return;
        }

        const newuser = {
          name: trimmedName,
          email: trimmedEmail,
          password: hash,
          phone: trimmedPhone,
        };

        globalData.user = newuser;
        globalData.otp = otp;
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


/**************************** User Register Verify Otp *************************************/

const userRegisterVerifyOtp = async (req, res) => {
  try {
    const { trimmedOtp } = req.body;
console.log(globalData.otp);
    if (!trimmedOtp) {
      return res.status(400).json({ error: "Verification code is required" });
    }

    const otpResponse = await verifyOtp(trimmedOtp, globalData?.otp, res);

    if (!otpResponse) {
      return res.status(400).json({ message: "OTP verification failed" });
    }

    const newUser = await userSchema.create(globalData.user);
    globalData.user = null;
    globalData.otp = null;
  

    return res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      
    });
  } catch (error) {}
};


/**************************** User Login  *************************************/

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email })
    

    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
       
       if(user.isActivated){
        res.status(201).json({
          _id: user?._id,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
         
        });
       }else{
        res.status(401).json({ error: "Inactive User" });
       }
        
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**************************** User get quiz  *************************************/

const userGetQuiz= async (req,res)=>{
  try {
    const quiz= await quizSchema.find({isActivated:true})
    if(quiz){
      res.status(201).json({quiz})
    }else{
      res.status(404).json({ error: "Quiz not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}



export {
  userRegisterSendOtp,
  userRegisterVerifyOtp,
  userLogin,
  userGetQuiz
};
