import styles from "./CartItem.module.css";

const CartItem = props => {
    const mealPrice = `$${(props.meal.price * props.meal.amount).toFixed(2)}`;

    return (
        <div className={styles['modal__cart-item']}>
            <div className={styles['modal__cart-item--info']}>
                <h3>{props.meal.name}</h3>
                <strong>{mealPrice}</strong>
            </div>

            <div className={styles['modal__cart-item--actions']}>
                <span>x {props.meal.amount}</span>

                <div>
                    <button onClick={props.onRemoveItem}>–</button>
                    <button onClick={props.onAddItem}>+</button>
                </div>
            </div>
        </div>
    )
};

export default CartItem;
