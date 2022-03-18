import mongoose from "mongoose";

const {Schema , Types} = mongoose;

const OrderDetail = new Schema({
    product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        reuired: true,
    },
})

export default mongoose.models.OrderDetail || mongoose.model('OrderDetail',OrderDetail);
