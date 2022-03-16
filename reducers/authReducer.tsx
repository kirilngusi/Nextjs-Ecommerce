export const authReducer = (state, action) => {
    const {
        type,
        payload: { auth, notify }
    } = action;

    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                auth,
                notify,
            };
        default:
            return state;
    }
};
