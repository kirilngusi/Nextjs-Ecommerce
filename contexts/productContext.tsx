import React, { createContext, useReducer, useEffect } from "react";

import { productReducer } from "../reducers/productReducer";
interface initialStateIprop {
    cart: [],
    notify: {},
    productLoading: boolean

}

interface ProductContextIprop {
    addToCart: (product:any, cart:[]) => any;
    ascendingProduct: (data: {}, id: string) => any;
    descendingProduct: (data: {}, id: string) => any;
    CancelProduct: (data: {}, id: string) => any;
    state: initialStateIprop;
    dispatch: ({}) => any;

}

type AuthContextProviderProps = {
    children?: JSX.Element;
};

export const ProductContext = createContext<ProductContextIprop>(null);

const ProductContextProvider = ({ children }: AuthContextProviderProps) => {
    const initialState = {
        notify: {},
        cart: [],
        productLoading: true,
    };

    const [state, dispatch] = useReducer(productReducer, initialState);

    const addToCart = (product: { inStock: number; _id: string; }, cart: []) => {
        if (product.inStock === 0) {
            return { type: "Notify", payload: { error: "product is soldout" } };
        }

        const check = cart.every((item: { _id: string; }) => {
            return item._id !== product._id;
        });

        if (!check) {
            return {
                type: "Notify",
                payload: { error: "product has been add to cart" },
            };
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        return {
            type: "ADD_TO_CART",
            payload: [...cart, { ...product, quantity: 1 }],
        };
    };

    const ascendingProduct = (data: any, id: string) => {
        const newData = [...data];
        newData.forEach((item) => {
            if (item._id === id) {
                item.quantity++;
            }
        });

        return { type: "ADD_TO_CART", payload: newData };
    };

    const descendingProduct = (data: any, id: string) => {
        const newData = [...data];
        newData.forEach((item) => {
            if (item._id === id) {
                if (item.quantity <= 1) {
                    return;
                }
                item.quantity--;
            }
        });

        return { type: "ADD_TO_CART", payload: newData };
    };

    const CancelProduct = (data: any[], id: string) => {
        const newData = data.filter((item: { _id: any; }) => item._id !== id);

        return { type: "DELETE_ITEM", payload: newData };
    };

    const TodoContextData: any = {
        state,
        dispatch,
        addToCart,
        ascendingProduct,
        descendingProduct,
        CancelProduct,
    };
    return (
        <ProductContext.Provider value={TodoContextData}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
