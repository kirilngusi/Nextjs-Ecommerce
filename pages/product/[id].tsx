import React, { useContext , useState} from "react";
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


    const [imgmain , setImgMain] = useState("/img1.jpg");


    const changeImg = (e) => {
            // setImgMain("/img2.jpg");        
            setImgMain(e.target.name)
            // console.log(e.target.name);
    }

    return (
        <div className="row">
            <div className="col-md-6 mt-3">
                <div className={styles.img_main}>
                    <img src={imgmain} alt="Card image cap" width="100%" />
                </div>
                <div className={styles.img_thumb}>
                    <img className={styles.img_thumb_item}
                        src="/img1.jpg"
                        alt="Card image cap"
                        width="110px"
                        height="100px"
                        name="/img1.jpg"
                        onClick={changeImg}
                    />

                    <img className={styles.img_thumb_item}
                        src="/img2.jpg"
                        name="/img2.jpg"
                        alt="Card image cap"
                        width="110px"
                        height="100px"
                        layout="fixed"
                        onClick={changeImg}

                    />
                </div>
            </div>
            <div className="col-md-6 mt-3">
                <h1 className="text-center">{res.product.name}</h1>
                <div className="text-center">
                    <p>Price: {`$${res.product.price}`}</p>
                </div>
                <div className="row">
                    <div className="col">
                        <p>InStock: {`${res.product.inStock}`}</p>
                    </div>
                    <div className="col text-right">
                        <p>Sold: {res.product.sold}</p>
                    </div>
                </div>
                <p>{res.product.description}</p>
                <button
                    className="btn btn-danger col-3"
                    onClick={() => dispatch(addToCart(res.product, cart))}
                >
                    Add To Cart
                </button>
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
