import React, {useReducer} from "react";
import CartContext from "./cart-context";

const defaultState = {
    items: [],
    totalPrice: 0,
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        let updatedItems;

        const updatedTotalPrice = state.totalPrice + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalPrice: updatedTotalPrice,
        }
    }

    if (action.type === 'REMOVE_ITEM') {
        let updatedItems;

        const itemToRemoveIndex = state.items.findIndex((item) => item.id === action.id);
        const itemToRemove = state.items[itemToRemoveIndex];
        const updatedTotalPrice = state.totalPrice - itemToRemove.price;

        if (itemToRemove.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            const updatedItem = { ...itemToRemove, amount: itemToRemove.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[itemToRemoveIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalPrice: updatedTotalPrice,
        };
    }

    if (action.type === 'RESET_CART') {
        return defaultState;
    }

    return defaultState;
};

const CartContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultState);

    const addItemHandler = (item) => {
        dispatchCartAction({
            type: 'ADD_ITEM', item,
        });
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE_ITEM', id,
        });
    };

    const resetCartHandler = () => {
        dispatchCartAction({
            type: 'RESET_CART',
        });
    };

    const cartCtx = {
        cartItems: cartState.items,
        totalPrice: cartState.totalPrice,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        resetCart: resetCartHandler,
    };

    return <CartContext.Provider value={cartCtx}>
        {props.children}
    </CartContext.Provider>
}

export default CartContextProvider;
