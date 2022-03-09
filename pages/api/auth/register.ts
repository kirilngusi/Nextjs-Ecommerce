import * as bcrypt from 'bcrypt';

import connectDB from "../../../utils/connectDb";
import User from '../../../models/userModel';

import valid from '../../../utils/valid';

const register = async (req:any, res:any) => {
    try {
        connectDB();
        const {username, password} = req.body;
        const errMsg = valid(username, password);
        if(errMsg) {
            return res.status(400).json({err: errMsg});
        }
        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({err: "Email is exists "});
        }
        
        //hash password
        const passwordHash = await bcrypt.hash(password,12);

        const newUser = new User({
            username, password:passwordHash
        })
        
        await newUser.save();

        res.json({msg: "Register success!"});




    } catch (err) {
        return res.status(500).json({err: err})
    }
}

export default register;