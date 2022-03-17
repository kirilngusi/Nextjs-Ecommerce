import connectDB from "../../../utils/connectDb";
import valid from "../../../utils/valid";
import Product from "../../../models/productModel";
import type { NextApiRequest, NextApiResponse } from 'next'


const getProductDetail = async (req:NextApiRequest, res:NextApiResponse ) => {
    try {
        connectDB();
        const {_id} = req.query;
        console.log(_id)
        const product = await Product.findOne({_id});
        res.json({
            success: true,
            product: product
        });
    } catch (err) {
        console.log(err)
    }
}

export default getProductDetail