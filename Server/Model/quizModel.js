import { model, Schema } from "mongoose";



const quizSchema = new Schema({

    
      question: {
        type: String,
        required: true,
      },
      option1: {
        type: String,
        required: true,
      },
      option2: {
        type: String,
        required: true,
      },
      option3: {
        type: String,
        required: true,
      },
      option4: {
        type: String,
        required: true,
      },
      answerOption: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        required: true,
        default:true,
      },
   
 
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model("quiz", quizSchema);
