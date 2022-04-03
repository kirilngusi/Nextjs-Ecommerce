import OrderProduct from "../../../models/orderModel";
import OrderDetail from "../../../models/orderItemModel";
import Product from "../../../models/productModel";
import User from "../../../models/userModel";

import connectDB from "../../../utils/connectDb";
import auth from "../../../middleware/auth";

import * as bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from 'next'


//@route PATCH api/user
//@desc changed new password
//@access private
const changePassword = async (req:NextApiRequest, res: NextApiResponse) => {
    try {
        connectDB();
        const  newPassword  = req.body;

        const result = await auth(req, res);
        const passwordHash = await bcrypt.hash(newPassword, 12);

        if (!newPassword) {
            return res
                .status(400)
                .json({ success: false, msg: "Not password" });
        }

        const userId = await User.findOne({
            _id: result.message.user_id,
        });

        const updatePass = await User.findOneAndUpdate(
            { password: userId.password, username: userId.username },
            { password: passwordHash },
            { new: true }
        );


        return res.status(200).json({
            success: true,
            message: {
                updatePass,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

export default changePassword;
