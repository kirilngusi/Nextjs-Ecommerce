import jwt from "jsonwebtoken";
import User from "../models/userModel";

const auth = async (req: any, res: any) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if (!token)
        return res
            .status(400)
            .json({ success: false, message: "Access token not found" });

    try {
        const key_secret = process.env.ACCESS_TOKEN_JWT as string;
      
        const decoded = jwt.verify(token, key_secret);

        if(!decoded) return res.status(400).json({success: false , message: 'Invalid Authentication.'})

        const user = await User.findOne({_id: decoded.userId}); 
        // // return user;
        // console.log("user" , user);
        // //if success
        // // req.userId = decoded.userId;
        //   return {id: user._id};


        return res.status(200).json({ success: true, message: {username: user.username ,  name: user.name , token:token, } });
    } catch (error) {
        return res.status(403).json({ success: false, message: error });
    }
};

export default auth;
