import connectDB from "../../../utils/connectDb";
import valid from "../../../utils/valid";
import Product from "../../../models/productModel";
import type { NextApiRequest, NextApiResponse } from 'next'


const getProductDetail = async (req:NextApiRequest, res:NextApiResponse ) => {
    try {
        connectDB();
        const {id} = req.query;
        const product = await Product.findOne({_id: id});
        res.json({
            product: product
        });
    } catch (err) {
        console.log(err)
    }
}

export default getProductDetail