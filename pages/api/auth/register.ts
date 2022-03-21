import * as bcrypt from "bcrypt";
import jwt, { sign, SignOptions } from "jsonwebtoken";

import connectDB from "../../../utils/connectDb";
import valid from "../../../utils/valid";
import User from "../../../models/userModel";
import type { NextApiRequest, NextApiResponse } from 'next'

const dotenv = require("dotenv");
dotenv.config();

const register = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        connectDB();
        const { username, password } = req.body;
        const errMsg = valid(username, password);
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


        res.json({
            success: true,
            msg: "Register successful",
            token: accessToken,
        });
    } catch (err) {
        return res.status(500).json({ err: err });
    }
};

export default register;
