import React , {useState, useContext} from "react";
import Image from "next/image";
import { productProps } from "../utils/types";
import Link from "next/link";
import { ProductContext } from "../contexts/productContext";


const ProductItem = ({ product }) => {
 
    const {addToCart, dispatch , state} = useContext(ProductContext);

    const {cart} = state;

    // console.log(product)

    return (
        <div className="card" style={{ width: "18rem" }}>
            <Image
                className="card-img-top"
                src="/image.png"
                alt="Card image cap"
                width={500}
                height={350}
            />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <div id="info" className="row">
                    <div className="col-6">
                        <p>Price: {`$${product.price}`}</p>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <p>Sold: {product.sold}</p>
                    </div>
                </div>
                <p className="card-text">{product.description}</p>
                <div className="row d-flex justify-content-between">
                    <Link href={`product/${product._id}`}>
                        <a className="btn btn-primary col-5">View</a>
                    </Link>
                    <button className="btn btn-danger col-5" onClick={() => dispatch(addToCart(product,cart))}>
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
