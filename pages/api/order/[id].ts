import OrderProduct from "../../../models/orderModel";
import OrderDetail from "../../../models/orderItemModel";
import Product from "../../../models/productModel";
import User from "../../../models/userModel";
import connectDB from "../../../utils/connectDb";

import auth from "../../../middleware/auth";

import { NextApiRequest, NextApiResponse } from "next";

//@route GET api/order/[id]
//@desc watch order with user
//@access private
const getOrderDetail = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        connectDB();

        const result = await auth(req, res);

        const { id } = req.query;

        const product = await OrderProduct.findOne({
            _id: id,
            user: result.message.user_id,
        })
            // .populate("user", "name")
            .populate({
                path: "orderItems",
                model: OrderDetail,
                populate: {
                    path: "product",
                    select: ["images", "price", "name"],
                    model: Product,
                },
            });

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "",
            });
        }

        return res.status(200).json({
            success: true,
            message: {
                product,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

export default getOrderDetail;
