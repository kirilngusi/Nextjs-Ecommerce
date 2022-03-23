import connectDB from "../../../utils/connectDb";
import orderSchema from '../../../models/orderItemModel'
import type { NextApiRequest, NextApiResponse } from 'next'
import auth from "../../../middleware/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method){
        case "POST":
            await Order(req, res);
            break;
    }
}


const Order = async (req:any, res: NextApiResponse) => {
    try {
        connectDB();
        console.log(req.Authorization);

        const result = await auth(req,res);

        console.log("result", result);

        res.json({
            
            result: result,
        });
        
    } catch (error) {
        console.log(error);
    }
}
