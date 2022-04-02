import React from "react";
import Navbar from "./Navbar";
import Notify from "./Notify";
import Footer from "./Footer";
type LayOutProps = {
    children?: JSX.Element;
};

const Layout = ({ children }: LayOutProps) => {
    return (
        <div className="">
            <Navbar />
            <Notify />
            <div>
                <div className="">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
