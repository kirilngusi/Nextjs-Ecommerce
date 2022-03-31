import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const orderSchema = new Schema({
    name: String,
    email: String,
    mobile: String,
    address: String,
    delivered: {
        type: Boolean,
        default: false,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },

    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    orderItems: [
        {
            type: Types.ObjectId,
            ref: "OrderDetail",
        },
    ],
});

export default mongoose.models.OrderProduct ||
    mongoose.model("OrderProduct", orderSchema);
