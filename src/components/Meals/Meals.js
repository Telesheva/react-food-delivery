import {useCallback, useContext, useEffect, useState} from 'react';
import styles from './Meals.module.css';
import Meal from './Meal/Meal';
import CartContext from "../../store/cart-context";

const Meals = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cartContext = useContext(CartContext);
    let content;

    const fetchMeals = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://react-food-delivery-b82d5-default-rtdb.firebaseio.com/meals.json');
            const rawMeals = await response.json();
            const formattedMeals = Object.values(rawMeals)[0];

            setMeals(formattedMeals);
        } catch (error) {
            setError('Error while meals fetching! Please try again.');
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchMeals();
    }, [fetchMeals]);

    const addToCartHandler = (meal, amount) => {
        cartContext.addItem({
            id: meal.id,
            name: meal.name,
            price: meal.price * amount,
            amount,
        });
    };

    content = <ul className={styles.meals}>
        {meals.map(meal => {
            return <Meal
                key={meal.id}
                meal={meal}
                onAddToCart={addToCartHandler}
            />
        })}
    </ul>;

    if (loading) {
        content = <p className={styles.placeholder}>Loading...</p>;
    }

    if (error) {
        content = <p className={styles.error}>{error}</p>;
    }

    return (
        <>
            {content}
        </>
    );
};

export default Meals;
