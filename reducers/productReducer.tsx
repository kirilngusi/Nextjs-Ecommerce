import * as React from "react";

enum ActionType {
    ADD_TO_CART = "ADD_TO_CART",
    Notify = "Notify",
    DELETE_ITEM = "DELETE_ITEM",
}

interface actionIprop {
    type: string;
    payload: {} | unknown;
}

interface initialStateIprop {
    productLoading: boolean;
}

export const productReducer: React.Reducer<initialStateIprop, actionIprop> = (
    state,
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case ActionType.ADD_TO_CART:
            return {
                ...state,
                cart: payload,
                productLoading: false,
            };

        case ActionType.Notify:
            return {
                ...state,
                notify: payload,
            };

        case ActionType.DELETE_ITEM:
            return {
                ...state,
                cart: payload,
            };

        default:
            return state;
    }
};
