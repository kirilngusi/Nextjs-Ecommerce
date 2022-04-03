import React, { useContext, useState, useEffect } from "react";
import styles from "../styles/Cart.module.css";
import { ProductContext } from "../contexts/productContext";
import Link from "next/link";

interface itemsProp {
    name: string,
    images: [],
    quantity: number,
    price: number,
    _id:string
}

const ProductCart = () => {
    const {
        state,
        dispatch,
        ascendingProduct,
        descendingProduct,
        CancelProduct,
    } = useContext(ProductContext);

    const { cart, productLoading } = state;

    const total = (): number => {
        var sum = 0;
        cart.forEach((item: { price: number; quantity: number }) => {
            sum += item.price * item.quantity;
        });

        return sum;
    };
    const initTotal = total;

    const [subtotal, setSubTotal] = useState(initTotal);

    useEffect(() => {
        setSubTotal(initTotal);
    }, [cart]);

    if (cart.length == 0) {
        return (
            <div className="container">
                <h1>Cart is emtpy</h1>
                <button className="btn btn-secondary" type="button">
                    <Link href="/">Back</Link>
                </button>
            </div>
        );
    }

    if (productLoading) {
        return <h1>Loading</h1>;
    }

    return (
        <div className="container">
            <div className={styles.title_heading}>
                <h2 className={styles.title_heading_text}>MY CART</h2>
            </div>
            <div className="float-right font-weight-bold mb-3 fz15">
                Subtotal: {subtotal}{" "}
            </div>
            <div className="table-responsive">
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
                        {cart.map((item:itemsProp, index:number) => (
                            <tr key={index} className="">
                                <th className="align-middle" scope="row">
                                    <img
                                        className=""
                                        src={item.images[0]}
                                        alt="Card image cap"
                                        width="70px"
                                        height="70px"
                                        layout="responsive"
                                        objectfit="contain"
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
                                                descendingProduct(
                                                    cart,
                                                    item._id
                                                )
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
                                            dispatch(
                                                CancelProduct(cart, item._id)
                                            )
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
                        <button
                            type="button"
                            className="btn btn-secondary mr-2"
                        >
                            CheckOut
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCart;
