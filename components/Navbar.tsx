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

    const { cart } = state;

    if (authLoading) {
        return <Loading />;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light nav-flex">
            <Link href="/">
                <a className="navbar-brand">Home</a>
            </Link>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ">
                    <li className="nav-item ">
                        <Link href="/cart">
                            <a className="nav-link">
                                {cart.length}
                                <i className="fas fa-cart-arrow-down">Cart</i>
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
                                    <i className="fas fa-sign-out-alt">Logout</i>
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

                    {/* <Link href="/login">
                        <a className="nav-link">
                            <i className="fas fa-user">Login</i>
                        </a>
                    </Link> 
                    {/* <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Username
                        </a>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdownMenuLink"
                        >
                            <a className="dropdown-item" href="/profile">
                                Profile
                            </a>
                           
                            <a className="dropdown-item" href="#">
                                Logout
                            </a>
                        </div>
                    </li> */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
