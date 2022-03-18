export const authReducer = (state, action) => {
    const {
        type,
        payload: { auth, notify, cart },
    } = action;

    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                auth,
                notify,
            };
        case "ADD_CART":
            return {
                ...state,
                cart,
            };
        default:
            return state;
    }
};
