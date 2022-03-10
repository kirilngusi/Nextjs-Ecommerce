import * as bcrypt from "bcrypt";
import jwt, { sign, SignOptions } from "jsonwebtoken";

import connectDB from "../../../utils/connectDb";
import valid from "../../../utils/valid";
import User from "../../../models/userModel";

const dotenv = require("dotenv");
dotenv.config();

const register = async (req: any, res: any) => {
    try {
        connectDB();
        const { username, password } = req.body;
        const errMsg = valid(username, password);
        if (errMsg) {
            return res.status(400).json({ err: errMsg });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ err: "User is exists " });
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
                admin: username === "admin" && password === "admin",
            },
            key_secret
        );

        console.log(accessToken);

        res.json({
            success: true,
            msg: "Login successful",
            token: accessToken,
        });
    } catch (err) {
        return res.status(500).json({ err: err });
    }
};

export default register;
