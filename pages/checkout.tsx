import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";

import { ProductContext } from "../contexts/productContext";
import { AuthContext } from "../contexts/AuthContext";

const Checkout = () => {
    const { state } = useContext(ProductContext);
    const { loadUser, dispatchAuth } = useContext(AuthContext);
    const { cart } = state;

    const total = (): number => {
        var sum = 0;
        cart.forEach((item) => {
            sum += item.price * item.quantity;
        });

        return sum;
    };
    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await loadUser();

            if (!res.success) {
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: {
                        auth: false,
                        token: "",
                        notifyAuth: "You not loggin !",
                        name: "",
                        username: "",
                    },
                });
                dispatchAuth({
                    type: "Notify",
                    payload: "You not loggin !",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="d-flex flex-md-row wrap">
            <div className="col-md-6">
                <p>Shipment Details</p>
                <p>
                    Have a account ?<Link href="/login">Login</Link>
                </p>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputName">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Name"
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
                            />
                        </div>
                        <div className="form-group col-md-5">
                            <label htmlFor="inputPhone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPhone"
                                placeholder="Phone Number"
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
                        />
                    </div>

                    <div className="row">
                        <div className="col-md">
                            <Link href="/cart">Cart</Link>
                        </div>
                        <div className="col-md d-flex flex-row-reverse">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={submitForm}
                            >
                                Complete your order
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

                <div>Transport fee : </div>

                <div>Total : ${total()} </div>
            </div>
        </div>
    );
};

export default Checkout;
