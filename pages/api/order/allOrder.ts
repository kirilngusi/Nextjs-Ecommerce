import OrderProduct from "../../../models/orderModel";
import OrderDetail from "../../../models/orderItemModel";
import Product from "../../../models/productModel";

import connectDB from "../../../utils/connectDb";
import auth from "../../../middleware/auth";

import { NextApiRequest, NextApiResponse } from 'next';

//@route GET api/order
//@desc watch order 
//@access private

const getAllOrderForUser = async (req:NextApiRequest, res: NextApiResponse) => {
    try {
        connectDB();

        const result = await auth(req, res);

        var userId = '';
        if(result.message.username === 'admin') {
            userId = await OrderProduct.find({})
        }
        else {
            //get id user
            userId = await OrderProduct.find({
                user: result.message.user_id,
            })
        }


        return res.status(200).json({
            success: true,
            message: {
                userId,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

export default getAllOrderForUser;


