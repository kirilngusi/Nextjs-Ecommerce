import React from 'react'

export const productReducer = (state,action) => {
    const {type, payload} = action;

    switch (type) {

        case 'ADD':
            return {
                ...state,
                cart: payload
            };
          
        default:
            return state;
    }
}
