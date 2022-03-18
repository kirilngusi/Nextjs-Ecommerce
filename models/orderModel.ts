import mongoose from 'mongoose';
const {Schema , Types} = mongoose;

const orderSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    orderItems: [
        {
            type: Types.ObjectId,
            ref: "OrderDetail"
        }
    ],
    address: String,
    mobile: String,
    delivered: {
        type: Boolean,
        default: false
    },
    totalPrice: {
        type: Number,
        default: 0,
    },

})

export default mongoose.models.Order || mongoose.model('Order',orderSchema);