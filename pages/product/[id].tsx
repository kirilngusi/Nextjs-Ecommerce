import React, { useContext, useState } from "react";
import { getData } from "../../utils/request";
import Image from "next/image";
import { productProps } from "../../utils/types";
import { ProductContext } from "../../contexts/productContext";

import styles from "../../styles/ProductDetail.module.css";

interface productDetailProps {
    product: productProps;
}

const ProductDetail = ({ res }: { res: productDetailProps }) => {
    const { addToCart, dispatch, state } = useContext(ProductContext);

    const { cart } = state;

    const [imgmain, setImgMain] = useState(res.product.images[0]);

    const changeImg = (e) => {
        setImgMain(e.target.name);
    };

    return (
        <div className="container">
            <div className="row mt-4 h-100">
                <div className="col-md-6 mt-3">
                    <div className={styles.img_main}>
                        <img
                            src={imgmain}
                            alt="Card image cap"
                            width="100%"
                        />
                    </div>
                    <div className={styles.img_thumb}>
                        {res.product.images.map((image, index) => (
                            <img
                                key={index}
                                className={styles.img_thumb_item}
                                src={image}
                                alt="Card image cap"
                                width="100px"
                                height="90px"
                                name={image}
                                onClick={changeImg}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-md-6 mt-4">
                    <h3 className="text-center">{res.product.name}</h3>
                    <div className="text-center">
                        <h5>Price: {`$${res.product.price}`}</h5>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>InStock: {`${res.product.inStock}`}</p>
                        </div>
                        <div className="col text-right">
                            <p>Sold: {res.product.sold}</p>
                        </div>
                    </div>
                    <h6 className="col text-center">
                        {res.product.description}
                    </h6>
                    <div className="col text-center">
                        <button
                            className="btn btn-danger col-5 "
                            onClick={() =>
                                dispatch(addToCart(res.product, cart))
                            }
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

export const getServerSideProps = async ({ params }: { params: any }) => {
    // const country = await getCountry(params.id);

    const res = await getData(`product/${params.id}`);
    return {
        props: { res },
    };
};
