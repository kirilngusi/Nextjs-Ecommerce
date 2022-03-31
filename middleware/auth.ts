import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { NextApiResponse } from "next";
import { serialize, parse } from "cookie";
import nookies from 'nookies'

const cookieOptions = {
    httpOnly: true,
    maxAge: 2592000,
    path: "/",
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
};

function setCookie(
    res: any,
    name: string,
    value: string,
    options: Record<string, unknown> = {}
): void {
    const stringValue =
        typeof value === "object"
            ? `j:${JSON.stringify(value)}`
            : String(value);

    res.setHeader("Set-Cookie", serialize(name, String(stringValue)));
}

const auth = async (req: any, res: any) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];

        // setCookie(res, "auth", token, cookieOptions);
        nookies.set(res, 'auth', token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          })

        if (!token)
            return res
                .status(400)
                .json({ success: false, message: "Access token not found" });

        const key_secret = process.env.ACCESS_TOKEN_JWT as string;

        const decoded = jwt.verify(token, key_secret);

        if (!decoded)
            return res
                .status(400)
                .json({ success: false, message: "Invalid Authentication." });

        const user = await User.findOne({ _id: decoded.userId });


        return {
            success: true,
            message: {
                username: user.username,
                name: user.name,
                token: token,
                user_id: user._id,
            },
            
        };
    } catch (error) {
        return res.status(403).json({ success: false, message: error });
    }
};

export default auth;
