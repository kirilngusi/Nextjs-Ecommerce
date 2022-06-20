import "../styles/globals.css";
import type { AppProps } from "next/app";

import AuthContextProvider from "../contexts/AuthContext";
import ProductContextProvider from "../contexts/productContext";
import AdminContextProvider from "../contexts/AdminContext";

import Layout from "../components/Layout";
// import DashBoard from "../pages/admin/login";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        /* tslint:disable */
        <ProductContextProvider>
            <AuthContextProvider>
                <AdminContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AdminContextProvider>
            </AuthContextProvider>
        </ProductContextProvider>
    );
}

export default MyApp;
