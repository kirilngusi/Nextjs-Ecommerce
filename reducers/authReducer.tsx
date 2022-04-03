import * as React from "react";

enum ActionType {
    SET_AUTH = "SET_AUTH",
    Notify = "Notify",
}

interface actionIprop {
    type: string;
    payload: {} | unknown;
}

interface initialStateIprop {
    authLoading: boolean;
}

export const authReducer: React.Reducer<initialStateIprop, actionIprop> = (
    state,
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case ActionType.SET_AUTH:
            return {
                ...state,
                authUser: payload,
                authLoading: false,
            };
        case ActionType.Notify:
            return {
                ...state,
                notifyAuth: payload,
            };

        default:
            return state;
    }
};
