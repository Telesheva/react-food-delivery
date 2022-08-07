import CartIcon from '../../Cart/CartIcon/CartIcon';
import classes from './HeaderCartButton.module.css';
import {useContext, useEffect, useState} from "react";
import CartContext from "../../../store/cart-context";

const HeaderCartButton = props => {
    const [animationState, setAnimationState] = useState(false);
    const cartContext = useContext(CartContext);
    const cartItemsNumber = cartContext.cartItems.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    const btnClasses = `${classes.button} ${animationState ? classes.bump : ''}`;

    useEffect(() => {
        if (cartItemsNumber > 0) {
            setAnimationState(true);
        }

        const timer = setTimeout(() => {
            setAnimationState(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartItemsNumber]);

    return (
        <>
            <button className={btnClasses} onClick={props.onOpenCartModal}>
                <span className={classes.icon}>
                    <CartIcon />
                </span>
                <span>Your Cart</span>
                <span className={classes.badge}>{cartItemsNumber}</span>
            </button>
        </>
    );
};

export default HeaderCartButton;
