import { useContext } from "react";
import styles from "./CartModal.module.css";
import CartContext from "../../../store/cart-context";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import CartItem from "../CartItem/CartItem";

const CartModal = props => {
    const cartContext = useContext(CartContext);
    const hasItems = cartContext.cartItems.length > 0;
    const totalAmountValue = `$${cartContext.totalPrice.toFixed(2)}`;

    const cartItemAddHandler = (item) => {
        cartContext.addItem({ ...item, amount: 1 });
    };

    const cartItemRemoveHandler = (id) => {
        cartContext.removeItem(id);
    };

    return (
        <Modal onCloseModal={props.onCloseModal}>
            {cartContext.cartItems.map((item) => <CartItem
                key={item.id}
                meal={item}
                onAddItem={cartItemAddHandler.bind(null, item)}
                onRemoveItem={cartItemRemoveHandler.bind(null, item.id)}
            />
            )}

            <div className={styles.total}>
                <strong>Total amount: </strong>
                <p>{totalAmountValue}</p>
            </div>

            <div className={styles['modal-footer']}>
                <Button isOutline={true} onClick={props.onCloseModal}>Close</Button>
                {hasItems && <Button onClick={props.onGoToCheckout}>Order</Button>}
            </div>
        </Modal>
    )
}

export default CartModal;
