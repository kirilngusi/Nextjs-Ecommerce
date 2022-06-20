import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter , NextRouter} from "next/router";

import styles from "../styles/Home.module.css";

import Footer from "../components/Footer";
import ProductItem from "../components/ProductItem";
import Loading from "../components/Loading";

import { getData } from "../utils/request";
import { productProps } from "../utils/types";
import filterSearch from "../utils/filterSearch";

import { ProductContext } from "../contexts/productContext";

interface IProps {
    productProps: productProps[];
    result: number;
}

const Home = (props: IProps) => {
    const [products, setProducts] = useState(props.productProps);
    const [page, setPage] = useState(1);
    const router:NextRouter = useRouter();

    // console.log(products);

    const handleLoadMore = () => {
        setPage(page + 1);
        filterSearch({ router, page: page + 1 }) ;
    };

    useEffect(() => {
        setProducts(props.productProps)
      },[props.productProps])

    useEffect(() => {
        if (Object.keys(router.query).length === 0) setPage(1);
    }, [router.query]);

    return (
        <>
            <div className="mb-5">
                <Head>
                    <title>Home</title>
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

                {products.length < page * 6 ? (
                    ""
                ) : (
                    <button
                        className="btn btn-outline-info d-block mx-auto mb-4"
                        onClick={handleLoadMore}
                    >
                        Load more
                    </button>
                )}

              
            </div>
            <Footer />
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const queryPage = query.page || "1";
    const page:number = +queryPage;
    const data = await getData(`product?limit=${page * 8}`);

    return {
        props: {
            productProps: data.products,
            result: data.result,
        },
    };
};
