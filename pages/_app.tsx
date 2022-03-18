import "../styles/globals.css";
import type { AppProps } from "next/app";

import AuthContextProvider from "../contexts/AuthContext";
import Layout from "../components/Layout";
import ProductContextProvider from "../contexts/productContext";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <AuthContextProvider>
                <ProductContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ProductContextProvider>
            </AuthContextProvider>
        </>
    );
}

export default MyApp;
