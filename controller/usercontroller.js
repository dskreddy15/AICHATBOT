import sendMail from "../middleware/userMail.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";


export const loginUser = async (req, res) => {
    try {
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email,
            });
        }

        const otp = Math.floor(Math.random() * 10000);

        const verifyToken = jwt.sign({ user, otp }, process.env.Secret_Key, {
            expiresIn: "5m",
        });

        await sendMail(email, "CHATBOT", otp);

        res.json({
            message: "OTP sent to Email",
            verifyToken,
        });

    } catch (error) {
        res.status(500).json({ message: error.message,});
    }

};

export const verifyUser = async (req, res) => {
    try {
      const { otp, verifyToken } = req.body;
  
      const verify = jwt.verify(verifyToken, process.env.Secret_Key);
  
      if (!verify)
        return res.status(400).json({
          message: "Otp Expired",
        });
  
      if (verify.otp !== otp)
        return res.status(400).json({
          message: "Wrong otp",
        });
  
      const token = jwt.sign({ _id: verify.user._id }, process.env.Jwt_sec, {
        expiresIn: "5d",
      });
  
      res.json({
        message: "Logged in successfully",
        user: verify.user,
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


export const myProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user._id);

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
  };