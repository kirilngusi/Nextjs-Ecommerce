import type { NextApiRequest, NextApiResponse } from 'next'
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import connectDB from "../../../utils/connectDb";
import {validRegis} from "../../../utils/valid";

import User from "../../../models/userModel";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case "POST":
            await register(req, res);
            break;
    }
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        connectDB();
        const {name, username, password} = req.body;

        const errMsg = validRegis(name,username, password);
        if (errMsg) {
            return res.status(400).json({ success: false , msg: errMsg });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({success: false , msg: " User is exists " });
        }

        //hash password
        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            username,
            password: passwordHash,
        });

        await newUser.save();

        //Return access token
        const key_secret = process.env.ACCESS_TOKEN_JWT as string;
        const accessToken = jwt.sign(
            {
                userId: newUser._id,
                admin: username === "admin",
            },
            key_secret
        );


        res.status(200).json({
            success: true,
            msg: "Register successful",
            token: accessToken,
            name: newUser.name,
            username: newUser.username
        });

    } catch (err) {
        return res.status(500).json({ err: err });
    }
};

