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
            return ({type: 'Notify' , payload: {error: "product is soldout"}})

        }

        const check = cart.every((item) => {
            return item._id !== product._id
        })

        if(!check) {
            return ({type: 'Notify' , payload:{error: "product has been add to cart"}})
        }
        
        
        return ({ type: 'ADD_TO_CART', payload: [...cart, {...product, quantity: 1}] }) 
    };

    const ascendingProduct = (data, id) => {
        const newData = [...data];
        newData.forEach((item) => {
            if(item._id === id) {
                item.quantity++
            }
        })
        return ({ type: 'ADD_TO_CART', payload: newData }) 

    }

    const descendingProduct = (data, id) => {
        const newData = [...data];
        newData.forEach((item) => {
            if(item._id === id) {
                if(item.quantity <=1) {
                    return;
                }
                item.quantity--
            }
        })
        return ({ type: 'ADD_TO_CART', payload: newData }) 

    }

    const CancelProduct = (data, id) => {
        const newData = data.filter((item) => item._id !== id) 
        return ({ type: 'DELETE_ITEM', payload: newData }) 

    }




    const TodoContextData = {
        state,
        dispatch,
        addToCart,
        ascendingProduct,
        descendingProduct,
        CancelProduct
    };
    return (
        <ProductContext.Provider value={TodoContextData}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;
