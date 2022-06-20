import connectDB from "../../../utils/connectDb";
import Product from "../../../models/productModel";
import type { NextApiRequest, NextApiResponse } from 'next'

// @route GET api/product
// @desc getProducts
// @access Public
const getProducts = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        connectDB();
        const limitData:any = req.query.limit ;
        const products = await Product.find().limit(parseInt(limitData));
        
        res.json({
            success: true,
            result: products.length,
            products: products
        });
    } catch (err) {
        console.log(err)
    }
}

export default getProducts