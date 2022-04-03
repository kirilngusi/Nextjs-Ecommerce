import React, { useContext } from "react";
import Link from "next/link";

import { ProductContext } from "../contexts/productContext";
import { AuthContext } from "../contexts/AuthContext";

import Loading from "./Loading";

const Navbar = () => {
    const { state } = useContext(ProductContext);

    const {
        authState: { authUser, authLoading },
        logOut,
    } = useContext(AuthContext);

    const {  cart } = state;

    if (authLoading) {
        return <Loading />;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light nav-flex sticky-top .d-print p-3 ">
            <div className="container-fluid mr-4 ml-4">
                <Link href="/">
                    <a className="navbar-brand ">Home</a>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo01"
                >
                    <ul className="navbar-nav ">
                        <li className="nav-item ">
                            <Link href="/cart">
                                <a className="nav-link">
                                    {cart.length || 0}
                                    <i className="fas fa-cart-arrow-down">
                                        Cart
                                    </i>
                                </a>
                            </Link>
                        </li>

                        {authUser.name ? (
                            <>
                                <li className="nav-item ">
                                    <Link href="/profile">
                                        <a className="nav-link">
                                            <i className="fas fa-user">
                                                {authUser.name}
                                            </i>
                                        </a>
                                    </Link>
                                </li>

                                <li className="nav-item" onClick={logOut}>
                                    <a className="nav-link">
                                        <i className="fas fa-sign-out-alt">
                                            Logout
                                        </i>
                                    </a>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item ">
                                <Link href="/login">
                                    <a className="nav-link">
                                        <i className="fas fa-user">Login</i>
                                    </a>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
