import React, { useContext } from "react";
import Toast from "./Toast";
import Loading from "./Loading";
import { ProductContext } from "../contexts/productContext";
import { AuthContext } from "../contexts/AuthContext";
const Notify = () => {
    const { state, dispatch } = useContext(ProductContext);
    const { dispatchAuth } = useContext(AuthContext);
    const { authState }: { authState: any } = useContext(AuthContext);

    const { notify }: { notify: any } = state;

    if (notify.error) {
        setTimeout(() => {
            dispatch({ type: "Notify", payload: {} });
        }, 3000);
    }

    if (authState.notifyAuth) {
        setTimeout(() => {
            dispatchAuth({ type: "Notify", payload: null });
        }, 3000);
    }

    return (
        <div>
            {notify.loading && <Loading />}
            {notify.error && (
                <Toast
                    bgColor={"bg-danger"}
                    msg={{ msg: notify.error, title: "Error" }}
                    handleClose={() =>
                        dispatch({ type: "Notify", payload: {} })
                    }
                />
            )}
            {authState.notifyAuth && (
                <Toast
                    bgColor={"bg-danger"}
                    msg={{ msg: authState.notifyAuth, title: "Error" }}
                    handleClose={() =>
                        dispatchAuth({ type: "Notify", payload: null })
                    }
                />
            )}
        </div>
    );
};

export default Notify;
