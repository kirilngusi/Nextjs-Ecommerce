export const authReducer = (state, action) => {
    const {
        type,
        payload,
    } = action;

    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                authUser: payload,
                authLoading: false,
            };
        case "Notify":
            return {
                ...state,
                notifyAuth: payload
            };

        default:
            return state;
    }
};
