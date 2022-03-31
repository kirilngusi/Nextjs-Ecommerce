import connectDB from "../../../utils/connectDb";
import Product from "../../../models/productModel";
import type { NextApiRequest, NextApiResponse } from 'next'

// @route GET api/product
// @desc getProducts
// @access Public
const getProducts = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
        connectDB();
        const products = await Product.find();
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