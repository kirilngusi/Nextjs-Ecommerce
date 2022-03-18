import React, { createContext, useReducer, useState, useEffect } from "react";

import { postData } from "../utils/request";

import { productReducer } from "../reducers/productReducer";
export const ProductContext = createContext(null);

type AuthContextProviderProps = {
    children?: JSX.Element;
};

const ProductContextProvider = ({ children }: AuthContextProviderProps) => {
    const initialState = { 
        notify: {}, cart: []
    }
    const [state, dispatch] = useReducer(productReducer, initialState);

    const addToCart = (product, cart) => {
        if (product.inStock === 0) {
            return;
        }
        return ({ type: 'ADD', payload: [...cart, {...product, quantity: 1}] }) 
    };

    console.log(state)


    const TodoContextData = {
        state,
        dispatch,
        addToCart
    };
    return (
        <ProductContext.Provider value={TodoContextData}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
