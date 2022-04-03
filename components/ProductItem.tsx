/* eslint-disable @next/next/link-passhref */
import React from "react";
import Link from "next/link";

import { productProps } from "../utils/types";

import styles from "../styles/ProductItem.module.css";

const ProductItem = ({ product }: { product: productProps }) => {
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
                                objectfit="contain"
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
                                objectfit="contain"
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
                </div>
            </Link>
        </div>
    );
};

export default ProductItem;
