import React from 'react'
import type { NextApiRequest, NextApiResponse } from 'next'
import User from "../../../models/userModel";
import auth from '../../../middleware/auth';
import jwt from "jsonwebtoken";

export default async (req: any, res: NextApiResponse) => {
    switch(req.method){
        case "GET":
            await auth(req, res);
            break;
    }
}
// const generateToken = async (req: any, res: NextApiResponse) => {
//   const { headers, body } = req
//     try {

//       await auth
//         // console.log("req", headers);
//         // const user = await User.findById(req.userId);
//         // console.log(user);
//         // if (!user) {
//         //   return res
//         //     .status(400)
//         //     .json({ success: false, message: "User not found" });
//         // }
//         // res.json({ success: true, user });
//       } catch (e) {
//         // console.log(e);
//         res.status(500).json({ success: false, message: "ERROR" });
//       }
// }
