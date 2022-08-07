import styles from './Header.module.css';
import mealsImage from '../../../assets/meals.jpg';
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

const Header = props => {
    return (
        <>
            <header className={styles.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onOpenCartModal={props.onOpenCartModal} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="Meals"/>

                <div className={styles['header-text']}>
                    <h2>Delicious Food, Delivered To You</h2>
                    <p>
                        Choose your favorite meal from our broad selection of available meals and
                        enjoy a delicious lunch or dinner at home.
                    </p>
                    <p>
                        All our meals are cooked with high-quality ingredients,
                        just-in-time and of course by experienced chefs!
                    </p>
                </div>
            </div>
        </>
    )
}

export default Header;
