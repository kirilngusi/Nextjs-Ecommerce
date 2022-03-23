import "../styles/globals.css";
import type { AppProps } from "next/app";

import AuthContextProvider from "../contexts/AuthContext";
import ProductContextProvider from "../contexts/productContext";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ProductContextProvider>
            <AuthContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthContextProvider>
        </ProductContextProvider>
    );
}

export default MyApp;
