import mongoose from "mongoose";
const {Schema , Types} = mongoose;

const orderDetail = new Schema({
    product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
})

export default mongoose.models.OrderDetail || mongoose.model('OrderDetail',orderDetail);
