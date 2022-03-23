import React, { createContext, useReducer, useState, useEffect } from "react";

import { authReducer } from "../reducers/authReducer";

import { postData, getData } from "../utils/request";

export const AuthContext = createContext(null);

type AuthContextProviderProps = {
    children?: JSX.Element;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const initialState = {
        authLoading: true,
    };

    const [authState, dispatchAuth] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        try {
            const response = await getData(
                "auth/generateToken",
                localStorage["token"]
            );

            //remove token if token wrong!
            if (!response.success) {
                localStorage.removeItem("token");
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: {
                        auth: false,
                        token: "",
                        notifyAuth: "You not loggin !",
                        name: null,
                        username: "",
                    },
                });

            }

            if (response.success) {
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: {
                        auth: true,
                        token: response.message.token,
                        notifyAuth: "",
                        name: response.message.name,
                        username: response.message.username,
                    },
                });
            }

            //remove token if token wrong!
        } catch (error) {
            localStorage.removeItem("token");

            dispatchAuth({
                type: "SET_AUTH",
                payload: {
                    auth: false,
                    token: "",
                    notifyAuth: "You not loggin !",
                    name: null,
                    username: "",
                },
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

 

    const loginUser = async (FormData: string): Promise<any> => {
        try {
            const res = await postData("auth/login", FormData);

            if (res.success) {
                localStorage.setItem("token", res.token);
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
                localStorage.setItem("token", res.token);
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
        localStorage.removeItem("token");
        dispatchAuth({ type: "SET_AUTH", payload: false });
    };

    const listData: any = {
        authState,
        loginUser,
        regisUser,
        logOut,
        dispatchAuth,
        loadUser,
    };

    return (
        <AuthContext.Provider value={listData}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
