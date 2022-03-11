import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import connectDB from "../../../utils/connectDb";
import valid from "../../../utils/valid";
import User from "../../../models/userModel";
import type { NextApiRequest, NextApiResponse } from 'next'

const dotenv = require("dotenv");

dotenv.config();

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        connectDB();
        const { username, password } = req.body;
        const errMsg = valid(username, password);
        if (errMsg) {
            return res.status(400).json({ err: errMsg });
        }
        const user = await User.findOne({ username });

        if (!user) {
            return res
                .status(400)
                .json({ err: "Invalid Username Or Password" });
        }

        //hash password
        const isPassCorrect = await bcrypt.compare(password, user.password);

        if (!isPassCorrect) {
            return res
                .status(400)
                .json({ err: "Invalid Username Or Password" });
        }

        const key_secret = process.env.ACCESS_TOKEN_JWT as string;
        //Return access token
        const accessToken = jwt.sign(
            {
                userId: user._id,
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

export default login;
