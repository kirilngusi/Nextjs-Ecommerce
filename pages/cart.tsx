import React, { useContext, useState, useEffect } from "react";
import styles from "../styles/Cart.module.css";
import { ProductContext } from "../contexts/productContext";
import Link from "next/link";

const ProductCart = () => {
    const {
        state,
        dispatch,
        ascendingProduct,
        descendingProduct,
        CancelProduct,
    } = useContext(ProductContext);

    const { cart, authLoading } = state;

    if(cart.length == 0) {
        return (
            <div>
                <h1>Cart is emtpy</h1>
                <button className="btn btn-secondary" type="button">
                    <Link href="/">Back</Link>
                </button>

            </div>
        )
    }

    if (authLoading) {
        return <h1>Loading</h1>;
    }

    const total = (): number => {
        var sum = 0;
        cart.forEach((item) => {
            sum += item.price * item.quantity;
        });

        return sum;
    };
    const initTotal = total;

    const [subtotal, setSubTotal] = useState<number>(initTotal)

    useEffect(() => {
        setSubTotal(initTotal);
    }, [cart]);

    return (
        <div>
            <div className={styles.title_heading}>
                <h2 className={styles.title_heading_text}>MY CART</h2>
            </div>
            <div className="float-right font-weight-bold mb-3 fz15">
                Subtotal: {subtotal}{" "}
            </div>

            <table className="table text-center">
                <thead>
                    <tr className={styles.productTable}>
                        <th scope="col"></th>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index} className="">
                            <th className="align-middle">
                                <img
                                    className=""
                                    src="/img1.jpg"
                                    alt="Card image cap"
                                    width="70px"
                                    height="70px"
                                    layout="responsive"
                                    objectFit="contain"
                                />
                            </th>
                            <td className="align-middle">{item.name}</td>

                            <td className="align-middle">
                                <input
                                    type="button"
                                    className="btn btn-secondary mr-2"
                                    value="-"
                                    onClick={() =>
                                        dispatch(
                                            descendingProduct(cart, item._id)
                                        )
                                    }
                                />
                                {item.quantity}
                                <input
                                    type="button"
                                    className="btn btn-secondary ml-2"
                                    value="+"
                                    onClick={() =>
                                        dispatch(
                                            ascendingProduct(cart, item._id)
                                        )
                                    }
                                />
                            </td>
                            <td className="align-middle">
                                {item.price * item.quantity}
                            </td>

                            <td className="align-middle">
                                <input
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                        dispatch(CancelProduct(cart, item._id))
                                    }
                                    value="Remove"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="d-flex flex-row-reverse mt-3">
                <Link href="/checkout">
                    <button type="button" className="btn btn-secondary mr-2">
                        CheckOut
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductCart;
