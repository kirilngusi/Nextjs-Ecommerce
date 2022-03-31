import React, { useState, useContext } from "react";
import Image from "next/image";
import { productProps } from "../utils/types";
import Link from "next/link";
import { ProductContext } from "../contexts/productContext";

import styles from "../styles/ProductItem.module.css";

const ProductItem = ({ product }) => {
    const { addToCart, dispatch, state } = useContext(ProductContext);

    const { cart } = state;

    return (
        <Link href={`product/${product._id}`}>
            <div className={styles.detail_product} style={{ width: "18rem" }}>
                <div className={styles.img_product}>
                    <img
                        className="card-img-top"
                        src="/img1.jpg"
                        alt="Card image cap"
                        width="100%"
                        height="100%"
                        layout="responsive"
                        objectFit="contain"
                    />
                </div>

                <div className={styles.desc_product}>
                    <h5 className="text-center">{product.name}</h5>
                    <p className="text-center">{`$${product.price}`}</p>
                </div>

                {/* <div id="info" className="row"> */}
                {/* <div className="col-6"> */}
                {/* </div>  */}
                {/* <div className="col-6 d-flex justify-content-end">
                        <p>Sold: {product.sold}</p>
                    </div> */}
                {/* </div> */}
                {/* <p className="card-text">{product.description}</p> */}
                {/* <div className="row d-flex justify-content-between">
                    <Link href={`product/${product._id}`}>
                        <a className="btn btn-primary ">View</a>
                    </Link>
                    <button className="btn btn-danger " onClick={() => dispatch(addToCart(product,cart))}>
                        Add
                    </button>
                </div> */}
            </div>
        </Link>
    );
};

export default ProductItem;
