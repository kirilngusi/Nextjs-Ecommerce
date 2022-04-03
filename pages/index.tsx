import { useState, useEffect , useContext} from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import styles from "../styles/Home.module.css";

import Footer from "../components/Footer";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";

import { getData } from "../utils/request";
import { productProps } from "../utils/types";

import {ProductContext} from "../contexts/productContext";

interface IProps {
    productProps: productProps[];
    result: number;
}

const Home = (props: IProps) => {
    const [products, setProducts] = useState(props.productProps);

    return (
        <>
            <div className="mb-5">
                <Head>
                    <title>Home Page</title>
                </Head>
                <div className={styles.title_heading}>
                    <h3 className={styles.title_heading_text}>
                        FEATURED PRODUCTS
                    </h3>
                </div>

                <div className="row ml-1 mr-1">
                    {products.length === 0 ? (
                        <h1>No Product</h1>
                    ) : (
                        products.map((product, index) => (
                            <ProductItem product={product} key={index} />
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await getData("product");

    return {
        props: {
            productProps: data.products,
            result: data.result,
        },
    };
};
