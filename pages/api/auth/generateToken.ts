import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from "../../../utils/connectDb";
import jwt from 'jsonwebtoken'
import User from "../../../models/userModel";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case "GET":
            await generateToken(req, res);
            break;
    }

}



const generateToken = async (req:any,res:NextApiResponse) => {
    try {

        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];


        const key_secret = process.env.ACCESS_TOKEN_JWT as string;

        const decoded = jwt.verify(token, key_secret);

        if (!decoded)
            return res
                .status(400)
                .json({ success: false, message: "Invalid Authentication." });

        const user = await User.findOne({ _id: decoded.userId });


        res.status(200).json({
            success: true,
            message: {
                username: user.username,
                name: user.name,
                token: token,
                user_id: user._id,
            },
            
        });

    } catch (error) {
        return res.status(403).json({ success: false, message: error });
        
    }
}
