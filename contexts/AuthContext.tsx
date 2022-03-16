import React, { createContext, useReducer, useState, useEffect } from "react";

import { authReducer } from "../reducers/authReducer";
import { postData } from "../utils/request";

export const AuthContext = createContext(null);

type AuthContextProviderProps = {
    children?: JSX.Element;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const initialState = {
        auth: false,
        notify: null,
    };

    const [authState, dispatch] = useReducer(authReducer, initialState);

    

    const loginUser = async (FormData: string): Promise<any> => {
        try {
            const res = await postData("auth/login", FormData);

            if (res.success) {
                localStorage.setItem("token", res.token);
                dispatch({
                    type: "SET_AUTH",
                    payload: { auth: true, notify: res.msg },
                });
            }

            if (res.err) {
                dispatch({
                    type: "SET_AUTH",
                    payload: { auth: false, notify: res.err },
                });
            }

            
        } catch (error) {
            console.log(error);
        }
    };

    const regisUser = async (FormData: string): Promise<any> => {
        try {
            const res = await postData("auth/register", FormData);

            // console.log(res)
            if (res.success) {
                localStorage.setItem("token", res.token);
                dispatch({
                    type: "SET_AUTH",
                    payload: { auth: true, notify: res.msg },
                });
            }
        } catch (error) {
            dispatch({
                type: "SET_AUTH",
                payload: { auth: false, notify: error },
            });
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        dispatch({ type: "SET_AUTH", payload: false });
    };

    const listData: any = { authState, loginUser, regisUser, logOut };

    return (
        <AuthContext.Provider value={listData}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
