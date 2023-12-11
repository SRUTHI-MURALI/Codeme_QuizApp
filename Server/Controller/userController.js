import userSchema from "../Model/userModel.js";
import quizSchema from "../Model/quizModel.js"
import bcrypt from "bcrypt";




/**************************** User Register Send Otp *************************************/

const userRegister = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, phone, password } = req.body;

    const emailfind = await userSchema.findOne({ email });

    if (emailfind) {
      res.status(400).json(" email already existing");
    } else {
      
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          res
            .status(500)
            .json("Some error occurred while hashing the password");
          return;
        }

        const newuser = new UserSchema ({
          name: name,
          email: email,
          password: hash,
          phone: phone,
        });
        await newuser.save()
console.log(newuser);
        res.status(200).json({ newuser });
        
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};



/**************************** User Login  *************************************/

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    

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
  userRegister,
  
  userLogin,
  userGetQuiz
};
