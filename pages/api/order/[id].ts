import OrderProduct from "../../../models/orderModel";
import connectDB from "../../../utils/connectDb";
import auth from "../../../middleware/auth";

//@route GET api/order
//@desc watch order with user
//@access private

const getOrderDetail = async (req, res) => {
    try {
        connectDB();

        await auth(req, res);

        const { id } = req.query;

        const product = await OrderProduct.findOne({
            _id: id,
        })
            .populate("user", "name")
            .populate({
                path: "orderItems",
                populate: {
                    path: "product",
                    select: ["images" , "price" , "name"]
                },
            });

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
