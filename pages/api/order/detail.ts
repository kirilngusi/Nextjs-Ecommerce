import OrderProduct from "../../../models/orderModel";
import OrderDetail from "../../../models/orderItemModel";
import Product from "../../../models/productModel";

import connectDB from "../../../utils/connectDb";
import auth from "../../../middleware/auth";

//@route GET api/order
//@desc watch order with user
//@access private

const getAllOrderForUser = async (req, res) => {
    try {
        connectDB();

        const result = await auth(req, res);


        const product = await OrderProduct.find({
            user: result.message.user_id,
        })

        // const product = await OrderProduct.find()
        //     .populate("user", "name")
        //     .populate({
        //         path: "orderItems",
        //         populate: {
        //             path: "product",
        //         },
        //     });

        // const product = await OrderProduct.findOne({
        //     orderItems: "624440a2ffed2c48bcc757da"
        // }).populate('OrderDetail')

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

export default getAllOrderForUser;
