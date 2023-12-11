
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import UserRegister from "./Pages/User/UserRegister";
import OtpVerify from "./Pages/Otp/OtpVerify";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserRegister />} />
          <Route path="/verifyOtp/:email" element={<OtpVerify />} />
          
        </Routes>
      </Router>
    </>
  );
}


export default App
