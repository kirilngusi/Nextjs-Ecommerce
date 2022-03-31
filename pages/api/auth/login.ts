import type { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import Cookies from 'cookies'

import connectDB from "../../../utils/connectDb";
import { validLogin } from "../../../utils/valid";

import User from "../../../models/userModel";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            await login(req, res);
            break;
    }
};

//@route POST api/auth/login
//@desc login user
//@access public
const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        connectDB();
        const { username, password } = req.body;
        const errMsg = validLogin(username, password);
        if (errMsg) {
            return res.status(400).json({ success: false, msg: errMsg });
        }
        const user = await User.findOne({ username });

        if (!user) {
            return res
                .status(400)
                .json({ success: false, msg: "Invalid Username Or Password" });
        }

        //hash password
        const isPassCorrect = await bcrypt.compare(password, user.password);

        if (!isPassCorrect) {
            return res
                .status(400)
                .json({ success: false, msg: "Invalid Username Or Password" });
        }

        const key_secret = process.env.ACCESS_TOKEN_JWT as string;

        //Return access token
        const accessToken = jwt.sign(
            {
                userId: user._id,
                admin: username === "admin",
            },
            key_secret,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            success: true,
            msg: "Login successful",
            token: accessToken,
            name: user.name,
            username: user.username,
            user_id: user._id,
        });
    } catch (err) {
        return res.status(500).json({ err: err });
    }
};
