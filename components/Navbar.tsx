import React from "react";
import Link from "next/link";

const Navbar = () => {


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light nav-flex">
            <Link href="/">
                <a className="navbar-brand">Home</a>
            </Link>
            {/* <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                data-bs-toggle="dropdown"
            >
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ">
                    <li className="nav-item ">
                        <Link href="/cart">
                            <a className="nav-link">
                                <i className="fas fa-cart-arrow-down">Cart</i>
                            </a>
                        </Link>
                    </li>

                    <li className="nav-item ">
                        <Link href="/login">
                            <a className="nav-link">
                                <i className="fas fa-user">Login</i>
                            </a>
                        </Link>
                    </li>

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
