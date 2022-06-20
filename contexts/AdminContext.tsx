import React, { createContext, useReducer, useEffect, useContext } from "react";

import { parseCookies, setCookie, destroyCookie } from "nookies";
import { adminReducer } from "../reducers/adminReducer";
import { postData, getData, patchData } from "../utils/request";

import { ProductContext } from "./productContext";

interface authUserIprop {
    auth: boolean;
    token: string;
    notifyAuth: string;
    name: string;
    username: string;
    user_id: string;
    admin: boolean;
}
interface initialStateIprop {
    authLoading: boolean;
    authUser: authUserIprop;
}
interface authContextIprop {
    authAdmin: initialStateIprop;
    dispatchAuth: ({}) => void;
    loginAdmin: (FormData: any) => any;
}

export const AdminContext = createContext<authContextIprop>(null);

const AdminContextProvider: React.FC<React.ReactNode> = ({ children }) => {
    const initialState = {
        authLoading: true,
    };

    const [authAdmin, dispatchAuthAdmin] = useReducer(adminReducer, initialState);

    const loadAdmin = async () => {
        try {
            const cookies = parseCookies();

            const response = await getData(
                "auth/generateToken",
                cookies["auth"]
            );


            //remove token if token wrong!
            if (!response.success) {
                destroyCookie(null, "auth");
                dispatchAuthAdmin({
                    type: "SET_AUTH",
                    payload: {
                        auth: false,
                        token: "",
                        notifyAuth: "You not loggin !",
                        name: null,
                        username: "",
                        user_id: "",
                        admin: "",
                    },
                });
            }

            if (response.success) {
                dispatchAuthAdmin({
                    type: "SET_AUTH",
                    payload: {
                        auth: true,
                        token: response.message.token,
                        notifyAuth: "",
                        name: response.message.name,
                        username: response.message.username,
                        user_id: response.message.user_id,
                        admin: response.message.admin,
                    },
                });
            }

            //remove token if token wrong!
        } catch (error) {
            destroyCookie(null, "auth");

            dispatchAuthAdmin({
                type: "SET_AUTH",
                payload: {
                    auth: false,
                    token: "",
                    notifyAuth: "You not loggin !",
                    name: null,
                    username: "",
                    user_id: "",
                    admin: "",
                },
            });
        }
    };

    useEffect(() => {
        loadAdmin();
    }, []);

    const loginAdmin = async (FormData: string): Promise<any> => {
        try {
            const res = await postData("admin", FormData);

            if (res.success) {
                setCookie(null, "auth", res.token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                });
            }

            if (!res.success) {
                dispatchAuthAdmin({
                    type: "SET_AUTH",
                    payload: { auth: false, token: "", notifyAuth: res.msg },
                });
                dispatchAuthAdmin({
                    type: "Notify",
                    payload: res.msg,
                });
            }

            await loadAdmin();

            return res;
        } catch (error) {
            dispatchAuthAdmin({
                type: "Notify",
                payload: error,
            });
            // console.log(error)
        }
    };

    const listData: any = {
        loginAdmin,
        authAdmin
    };

    return (
        <AdminContext.Provider value={listData}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
