import userSchema from "../Model/userModel.js";
import adminSchema from "../Model/adminModel.js";
import quizSchema from "../Model/quizModel.js";

/**************************** Admin Login  *************************************/

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminSchema.findOne({ email });

    if (admin) {
      if (admin.password == password) {
        res.status(201).json({
          _id: admin?._id,
          name: admin?.name,
          email: admin?.email,
        });
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

/**************************** Admin get User Details *************************************/

const userDetails = async (req, res) => {
  try {
    const user = await userSchema.find();

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(500).json({ message: "no user to display" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** Admin  approveUser*************************/

const approveUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userSchema.findById(id);

    if (user) {
      await userSchema.findByIdAndUpdate(
        id,
        {
          isApproved: true,
        },
        { new: true }
      );

      const updatedUser = await userSchema.findById(id);

      res.status(200).json({ updatedUser });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** Admin  unApproveUser*************************/

const unApproveUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userSchema.findById(id);

    if (user) {
      await userSchema.findByIdAndUpdate(
        id,
        {
          isApproved: false,
        },
        { new: true }
      );

      const updatedUser = await userSchema.findById(id);

      res.status(200).json({ updatedUser });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** Admin get quiz *************************************/
const getQuiz = async (req, res) => {
  try {
    const quiz = await quizSchema.find();

    if (quiz) {
      res.status(200).json({ quiz });
    } else {
      res.status(500).json({ message: "no quiz to display" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** Admin add quiz *************************************/

const addQuiz = async (req, res) => {
  const { question, option1, option2, option3, option4, answerOption } =
    req.body;

  try {
    const newQuiz = await quizSchema.create({
      question,
      option1,
      option2,
      option3,
      option4,
      answerOption,
    });
    if (newQuiz) {
      res.status(201).json(newQuiz);
    } else {
      res.status(404).json({ error: "error uploading" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

/**************************** Admin edit quiz *************************************/

const editQuiz = async (req, res) => {
  

  try {
    const {id}= req.params;
  const { question, option1, option2, option3, option4, answerOption } =
    req.body;

    const quiz = await quizSchema.findById(id);

    if (quiz) {
      await quizSchema.findByIdAndUpdate(
        id,
        {
          question,
          option1, option2, option3, option4, answerOption

        },
        { new: true }
      );

      const updatedQuiz = await quizSchema.findById(id);
   
    if (updatedQuiz) {
      res.status(201).json(updatedQuiz);
    } else {
      res.status(404).json({ error: "error updating" });
    }
  } }
  catch (error) {
    res.status(400).json(error);
  }
};


/**************************** Admin delete quiz *************************************/
const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await quizSchema.findById(id);

    if (quiz) {
      await quizSchema.findByIdAndUpdate(
        id,
        {
          isActive: false,
        },
        { new: true }
      );

      const updatedUser = await userSchema.findById(id);

      res.status(200).json({ updatedUser });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**************************** Admin undelete quiz *************************************/

const unDeleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await quizSchema.findById(id);

    if (quiz) {
      await quizSchema.findByIdAndUpdate(
        id,
        {
          isActive: true,
        },
        { new: true }
      );

      const updatedUser = await userSchema.findById(id);

      res.status(200).json({ updatedUser });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {adminLogin,userDetails,approveUser,unApproveUser,getQuiz,addQuiz,editQuiz,deleteQuiz,unDeleteQuiz};
