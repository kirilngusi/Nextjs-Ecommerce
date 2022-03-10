import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: 'string',
        unique: true,
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.models.User || mongoose.model('User',userSchema);