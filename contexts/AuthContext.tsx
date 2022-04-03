import React, { createContext, useReducer, useEffect } from "react";

import { parseCookies, setCookie, destroyCookie } from "nookies";
import { authReducer } from "../reducers/authReducer";
import { postData, getData, patchData } from "../utils/request";

interface authUserIprop {
    auth: boolean,
    token: string,
    notifyAuth: string,
    name: string,
    username: string,
    user_id: string,
}
interface initialStateIprop {
    authLoading: boolean
    authUser: authUserIprop
}
interface authContextIprop {
    loadUser: () => void,
    logOut: () => void,
    loginUser: (FormData: any) => any,
    regisUser: (FormData: any) => any,
    changePassWord: (FormData: any) => any,
    authState: initialStateIprop,
    dispatchAuth: ({}) => void,   

}

export const AuthContext = createContext<authContextIprop>(null);

const AuthContextProvider:React.FC<React.ReactNode> = ({ children }) => {
    const initialState = {
        authLoading: true,
    };

    const [authState, dispatchAuth] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        try {
            const cookies = parseCookies();

            const response = await getData(
                "auth/generateToken",
                cookies["auth"]
            );

            //remove token if token wrong!
            if (!response.success) {
                destroyCookie(null, "auth");
                dispatchAuth({
                    type: "SET_AUTH",
                    payload: {
                        auth: false,
                        token: "",
                        notifyAuth: "You not loggin !",
                        name: null,
                        username: "",
                        user_id: "",
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
                        user_id: response.message.user_id,
                    },
                });
            }

        //remove token if token wrong!
        } catch (error) {
            destroyCookie(null, "auth");

            dispatchAuth({
                type: "SET_AUTH",
                payload: {
                    auth: false,
                    token: "",
                    notifyAuth: "You not loggin !",
                    name: null,
                    username: "",
                    user_id: "",
                },
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const changePassWord = async (FormData: string): Promise<any> => {
        try {
            const cookies = parseCookies();
                                
            const res = await patchData("user", FormData, cookies["auth"]);

            return res;

            // await loadUser();
        } catch (error) {
            console.log(error);
        }
    };

    const loginUser = async (FormData: string): Promise<any> => {
        try {
            const res = await postData("auth/login", FormData);
            if (res.success) {
                setCookie(null, "auth", res.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                });
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

            if (res.success) {
                setCookie(null, "auth", res.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                });
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
        destroyCookie(null, "auth");
        dispatchAuth({ type: "SET_AUTH", payload: false });
    };

    const listData:any = {
        authState,
        loginUser,
        regisUser,
        logOut,
        dispatchAuth,
        loadUser,
        changePassWord,
    };

    return (
        <AuthContext.Provider value={listData}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;


