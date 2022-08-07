import { useRef } from "react";
import styles from './Meal.module.css';
import Button from "../../UI/Button/Button";

const Meal = props => {
    const amountInputRef = useRef();

    const addToCartHandler = () => {
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +amountInputRef.current.value;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            return;
        }

        props.onAddToCart({ ...props.meal }, enteredAmountNumber);
    };

    return (
        <li className={styles.meal}>
            <div className={styles['meal__info']}>
                <h3>{props.meal.name}</h3>
                <span>{props.meal.description}</span>
                <strong>${props.meal.price}</strong>
            </div>

            <div className={styles['meal__actions']}>
                <div className={styles['meal__control']}>
                    <label htmlFor="amount" className={styles['meal__label']}>Amount</label>
                    <input
                        ref={amountInputRef}
                        id="amount"
                        className={styles['meal__amount-input']}
                        type="number"
                        min="1"
                        max="5"
                        defaultValue="1"
                    />
                </div>
                <Button onClick={addToCartHandler}>+ Add</Button>
            </div>
        </li>
    )
};

export default Meal;
