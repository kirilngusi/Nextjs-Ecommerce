export const productReducer = (state, action) => {
    const { type, payload} = action;
    switch (type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: payload,
            };

        case "Notify":
            return {
                ...state,
                notify: payload,
            };
        
        case "DELETE_ITEM":
            return {
                ...state,
                cart: payload,
            };
            
        default:
            return state;
    }
};
