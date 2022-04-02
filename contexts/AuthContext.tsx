import React, { createContext, useReducer, useState, useEffect } from "react";
import { useRouter } from "next/router";
import nookies from 'nookies'

import { authReducer } from "../reducers/authReducer";

import { postData, getData , patchData } from "../utils/request";

import {setTokenCookie } from '../middleware/auth-cookies';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export const AuthContext = createContext(null);

type AuthContextProviderProps = {
    children?: JSX.Element;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const router = useRouter();

    const initialState = {
        authLoading: true,
    };

    const [authState, dispatchAuth] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        try {
            const cookies = parseCookies()
                 
            const response = await getData(
                "auth/generateToken",
                cookies["auth"]
            );

            // console.log("res23", response)

            //remove token if token wrong!
            if (!response.success) {
                destroyCookie(null, 'auth')
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: {
                        auth: false,
                        token: "",
                        notifyAuth: "You not loggin !",
                        name: null,
                        username: "",
                        user_id: ""
                    },
                });

            }

            if (response.success) {
                // router.push("/");
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: {
                        auth: true,
                        token: response.message.token,
                        notifyAuth: "",
                        name: response.message.name,
                        username: response.message.username,
                        user_id: response.message.user_id,
                    },
                });
            }

            //remove token if token wrong!
        } catch (error) {
            destroyCookie(null, 'auth')

            dispatchAuth({
                type: "SET_AUTH",
                payload: {
                    auth: false,
                    token: "",
                    notifyAuth: "You not loggin !",
                    name: null,
                    username: "",
                    user_id: ""
                },
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);


    const changePassWord = async (FormData: string):Promise<any> => {
        try {
            const cookies = parseCookies()
            const res = await patchData("user",FormData, cookies["auth"]);
            // if(res.success) {
            //     console.log(res.message);
            // }

            return res;

            // await loadUser();

        } catch (error) {
            console.log(error);
        }
    }
 

    const loginUser = async (FormData: string): Promise<any> => {
        try {
            const res = await postData("auth/login", FormData);
            if (res.success) {
                // localStorage.setItem("token", res.token);

                setCookie(null, 'auth', res.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                  })
            }

            if (!res.success) {
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: { auth: false, token: "", notifyAuth: res.msg },
                });
                dispatchAuth({
                    type: "Notify",
                    payload: res.msg,
                });
            }

            await loadUser();

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
                // localStorage.setItem("token", res.token);
                setCookie(null, 'auth', res.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                  })
            }
            if (!res.success) {
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: { auth: false, token: "", notifyAuth: res.msg },
                });
                dispatchAuth({
                    type: "Notify",
                    payload: res.msg,
                });
            }

            await loadUser();

            return res;
        } catch (error) {
            dispatchAuth({
                type: "Notify",
                payload: error,
            });
        }
    };

    const logOut = () => {
        // localStorage.removeItem("token");
        destroyCookie(null, 'auth')
        dispatchAuth({ type: "SET_AUTH", payload: false });
    };

    const listData: any = {
        authState,
        loginUser,
        regisUser,
        logOut,
        dispatchAuth,
        loadUser,
        changePassWord
    };

    return (
        <AuthContext.Provider value={listData}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
