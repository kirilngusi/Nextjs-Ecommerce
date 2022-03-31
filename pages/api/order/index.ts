import connectDB from "../../../utils/connectDb";
import OrderProduct from "../../../models/orderModel";
import OrderDetail from "../../../models/orderItemModel";
import type { NextApiRequest, NextApiResponse } from "next";
import auth from "../../../middleware/auth";
import {getData} from "../../../utils/request";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     switch (req.method) {
//         case "POST":
//             await Order(req, res);
//             break;
//     }
// };


//@route POST api/order
//@desc save order to database
//@access private
 const Order = async (req: any, res: NextApiResponse) => {
    connectDB();

    const result = await auth(req, res);

    const {
        name,
        email,
        mobile,
        address,
        totalPrice,
    } = req.body;

    const orderItemIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderDetail({
                product: orderItem._id,
                quantity: orderItem.quantity,
            });
            await newOrderItem.save();
            return newOrderItem._id;
        })
    );

    const data = await orderItemIds;


    try {
        const checkOutOrder = new OrderProduct({
            name,
            email,
            mobile,
            address,
            totalPrice,
            user: result.message.user_id, 
            orderItems: data
        });

        await checkOutOrder.save();

        res.json({
            success: true,
            order: checkOutOrder,
        });
    } catch (error) {
        console.log(error);
    }
};

export default Order;
