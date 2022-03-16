import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const dotenv = require("dotenv");

dotenv.config();

const auth = async (req:any, res:any) => {
    const authHeader = req.header("Authorization");
    const token = authHeader || authHeader.split(" ")[1];

    if (!token)
    return res
      .status(400)
      .json({ success: false, message: "Access token not found" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_JWT as string);

    console.log(decoded);

    if(!decoded) return res.status(400).json({err: 'Invalid Authentication.'})

    // const user = await User.findOne({_id: decoded  })
    // return user;

    //if success
    // req.userId = decoded.userId;

  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
}

export default auth;