import React , {useContext} from "react";
import Navbar from "./Navbar";
import Notify from "./Notify";
import Footer from "./Footer";
import Loading from './Loading';
import {AuthContext} from '../contexts/AuthContext';

type LayOutProps = {
    children?: JSX.Element;
};



const Layout = ({ children }: LayOutProps) => {
    const {authState: {authUser, authLoading}} = useContext(AuthContext);


    if(authLoading) {
        return <Loading/>
    }
    
    const {username} = authUser;

    return (
        <div className="">
            {/* {
                username == 'admin' ? "" : <Navbar />
            } */}
            <Navbar/>
            <Notify />
            <div>
                <div className="">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
