import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ProductContext } from "../contexts/productContext";
import { AuthContext } from "../contexts/AuthContext";

import { postData } from "../utils/request";

import styles from "../styles/Checkout.module.css";

const Checkout = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(ProductContext);
    const { loadUser, dispatchAuth, authState } = useContext(AuthContext);
    const { cart, authLoading } = state;

    const { authUser } = authState;

    if (!authUser || authUser.auth === false) {
        return <h1>You not loggin !</h1>;
    }

    const total = (): number => {
        var sum = 0;
        cart.forEach((item) => {
            sum += item.price * item.quantity;
        });

        return sum;
    };

    const [formOrder, setFormOrder] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        totalPrice: total(),
        user: authUser.user_id,
        orderItems: cart,
    });

    const onChangeForm = (e) => {
        setFormOrder({ ...formOrder, [e.target.name]: e.target.value });
    };

    const { name, email, mobile, address } = formOrder;

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            let token = authUser.token ;
            const response = await postData("order", formOrder,token);


            if (response.success) {
                localStorage.removeItem("cart");
                dispatch({ type: "ADD_TO_CART", payload: [] });

                // router.push("/order/dsf");
            }
        } catch (error) {
            dispatchAuth({
                type: "Notify",
                payload: error,
            });
        }
    };

    return (
        <>
            <div className={styles.title_heading}>
                <h2 className={styles.title_heading_text}>MY CART</h2>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputName">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={onChangeForm}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-7">
                                <label htmlFor="inputEmail4">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail4"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={onChangeForm}
                                />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="inputPhone">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputPhone"
                                    placeholder="Phone Number"
                                    name="mobile"
                                    value={mobile}
                                    onChange={onChangeForm}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputAddress"
                                placeholder="Address"
                                name="address"
                                value={address}
                                onChange={onChangeForm}
                            />
                        </div>

                        <div className="d-flex flex-md-row mb-4">
                            <div className="col-md-6 ">
                                <Link href="/cart">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Cart
                                    </button>
                                </Link>
                            </div>
                            <div className="col-md-6 d-flex flex-row-reverse ">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={submitForm}
                                >
                                    Complete Order
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <div>
                        <table className="table">
                            <thead className="">
                                <tr className="">
                                    <th scope="col">
                                        <span className="visually-hidden">
                                            Image
                                        </span>
                                    </th>
                                    <th scope="col">
                                        <span className="visually-hidden">
                                            Description
                                        </span>
                                    </th>
                                    <th scope="col">
                                        <span className="visually-hidden">
                                            Price
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {item.images}
                                            <span>{item.quantity}</span>
                                        </td>
                                        <td>{item.name}</td>

                                        <td>{item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex flex-md-row">
                        <div className="input-group col-9">
                            <input
                                type="text"
                                aria-label="Last name"
                                className="form-control"
                                placeholder="Discount Code"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary col-3">
                            Enter
                        </button>
                    </div>

                    <div className={styles.total_container}>
                        <div>Transport fee : </div>

                        <div>Total : ${total()} </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
