import type { NextPage } from "next";
import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../contexts/AuthContext";

import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

import { postData, getData } from "../utils/request";
import ProductItem from "../components/ProductItem";
import Head from "next/head";

import {productProps} from '../utils/types'

interface IProps {
    productProps: productProps[];
    result: number;
}

const Home: NextPage = (props: IProps) => {
    const [products, setProducts] = useState(props.productProps);
    // const router = useRouter();
    // const { authState , logOut}  = useContext(AuthContext);

    // console.log(products);

    return (
        <div>
            <Head>
                <title>Home Page</title>
            </Head>

            {products.length === 0 ? (
                <h1>No Product</h1>
            ) : (
                products.map((product,index) => (
                    <ProductItem product={product} key={index}/>
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
