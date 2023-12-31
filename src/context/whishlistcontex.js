import { createContext, useReducer } from "react";

export const WishlistContext = createContext();

export const WishContext = (props) => {

    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                const temp = state.filter((item) => action.payload.id === item.id);
                if (temp.length > 0) {
                    return state;
                } else {
                    return [...state, action.payload]
                }
            case 'REMOVE':
                const tempstate = state.filter((item) => item.id !== action.payload.id)
                return tempstate

            case 'CLEAR':
                return [];

            default: return state;
        }

    }
    const [state, dispatch] = useReducer(reducer, [])
    const info = { state, dispatch };


    return (
        <WishlistContext.Provider value={info}>
            {props.children}
        </WishlistContext.Provider>
    )
}