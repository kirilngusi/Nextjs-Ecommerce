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
        <div className="col-lg-3 col-6">
            <Link href={`product/${product._id}`}>
                <div
                    className={styles.detail_product}
                    // style={{ width: "18rem" }}
                >
                    <div className={styles.img_product}>
                        <div className={styles.img_productHead}>
                            <img
                                className="card-img-top"
                                src={product.images[0]}
                                alt="Card image cap"
                                width=""
                                height=""
                                layout="responsive"
                                objectFit="contain"
                            />
                        </div>
                        <div className={styles.img_productHide}>
                            <img
                                className="card-img-top"
                                src={product.images[1]}
                                alt="Card image cap"
                                width=""
                                height=""
                                layout="responsive"
                                objectFit="contain"
                            />
                        </div>
                    </div>

                    <div className={styles.desc_product}>
                        <strong className="text-center d-block ">
                            {product.name}
                        </strong>
                        <p className="text-center d-block mt-3">
                            {product.description}
                        </p>
                        <strong className="text-center d-block ">{`$${product.price}`}</strong>
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
        </div>
    );
};

export default ProductItem;
