import React, { createContext, useReducer, useState, useEffect } from "react";

import { authReducer } from "../reducers/authReducer";
import { postData } from "../utils/request";

export const AuthContext = createContext(null);

type AuthContextProviderProps = {
    children?: JSX.Element;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const initialState = {
        authUser: null,
        user: null,
    };

    const [authState, dispatchAuth] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        if(localStorage["token"]) {
            console.log("first")
        }
    }

    const loginUser = async (FormData: string): Promise<any> => {
        try {
            const res = await postData("auth/login", FormData);

            await loadUser();
            if (res.success) {
                localStorage.setItem("token", res.token);
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: { auth: true, token: res.token , notifyAuth: res.msg} ,
                });
            } 

            if(!res.success) {
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: { auth: false, token: "", notifyAuth: res.msg} ,
                });
                dispatchAuth({
                    type: "Notify",
                    payload: res.msg,
                });
            }

            return res;
            
        } catch (error) {
            dispatchAuth({
                type: "Notify",
                payload: error,
            });
        }
    };

    const regisUser = async (FormData: string): Promise<any> => {
        try {
            const res = await postData("auth/register", FormData);

            // console.log(res)
            if (res.success) {
                localStorage.setItem("token", res.token);
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: { auth: true, token: res.token , notifyAuth: res.msg},
                });
            }
            if(!res.success) {
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: { auth: false, token: "", notifyAuth: res.msg} ,
                });
                dispatchAuth({
                    type: "Notify",
                    payload: res.msg,
                });
            }
        } catch (error) {
            dispatchAuth({
                type: "Notify",
                payload: error,
            });
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        dispatchAuth({ type: "SET_AUTH", payload: false });
    };

    const listData: any = { authState, loginUser, regisUser, logOut , dispatchAuth};

    return (
        <AuthContext.Provider value={listData}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
