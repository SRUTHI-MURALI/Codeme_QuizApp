const verifyOtp = (trimmedOtp, otp, res) => {
    try {
      if (trimmedOtp == otp) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error: Something went wrong", error);
      return res.status(400).json({ message: "Something went wrong" });
    }
  };
  
  export default verifyOtp;
  