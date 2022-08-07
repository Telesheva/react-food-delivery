import { useContext } from 'react';
import styles from './Meals.module.css';
import Meal from './Meal/Meal';
import CartContext from "../../store/cart-context";

const meals = [
    {
        id: '182912',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: '22.99',
    },
    {
        id: '19889121',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: '16.50',
    },
    {
        id: '46374892',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: '12.99',
    },
    {
        id: '532898308',
        name: 'Green Bowl',
        description: 'Healthy... and green...',
        price: '18.99',
    },
];

const Meals = () => {
    const cartContext = useContext(CartContext);

    const addToCartHandler = (meal, amount) => {
        cartContext.addItem({
            id: meal.id,
            name: meal.name,
            price: meal.price * amount,
            amount,
        });
    };

    return (
        <>
            <ul className={styles.meals}>
                {meals.map(meal => {
                    return <Meal
                        key={meal.id}
                        meal={meal}
                        onAddToCart={addToCartHandler}
                    />
                })}
            </ul>
        </>
    );
};

export default Meals;
