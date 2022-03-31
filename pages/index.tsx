import { useContext, useState, useEffect } from "react";

import Head from "next/head";
import type { NextPage } from "next";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

import styles from "../styles/Home.module.css";

import { ProductContext } from "../contexts/productContext";

import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";

import { getData } from "../utils/request";

import { productProps } from "../utils/types";

interface IProps {
    productProps: productProps[];
    result: number;
}

const Home = (props: IProps) => {
    const [products, setProducts] = useState(props.productProps);

    return (
        <div>
            <Head>
                <title>Home Page</title>
            </Head>
                <div className={styles.title_heading}>
                    <h2 className={styles.title_heading_text}>FEATURED PRODUCTS</h2>
                </div>

                {products.length === 0 ? (
                    <h1>No Product</h1>
                ) : (
                    products.map((product, index) => (
                                <ProductItem product={product} key={index} />
                    ))
                )}
        </div>
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
