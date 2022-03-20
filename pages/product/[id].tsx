import React , {useContext} from "react";
import { getData } from "../../utils/request";
import Image from "next/image";
import { productProps } from "../../utils/types";
import {ProductContext} from '../../contexts/productContext';



interface productDetailProps {
  product: productProps
}

const ProductDetail = ({ res }: {res: productDetailProps}) => {
    
    const {addToCart , dispatch , state} = useContext(ProductContext)

    const {cart} = state

    return (
            <div className="row">
                <div className="col-md-6">
                    <Image
                        src="/image.png"
                        alt="Card image cap"
                        width={600}
                        height={400}
                    />
                    <div className="img-thumb">
                    <Image
                        src="/image.png"
                        alt="Card image cap"
                        width={120}
                        height={80}
                        layout="fixed"
                    />
                    </div>
                </div>
                <div className="col-md-6">
                    <h1>{res.product.name}</h1>
                    <div className="">
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
                    <button className="btn btn-danger col-3" onClick={() => dispatch(addToCart(res.product,cart))}>
                        Add To Cart
                    </button>
                </div>
            </div>
    );
};

export default ProductDetail;

export const getServerSideProps = async ({ params} : {params: any}) => {
    // const country = await getCountry(params.id);

    const res = await getData(`product/${params.id}`);
    return {
        props: { res },
    };
};
