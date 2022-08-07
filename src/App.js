import {useState} from "react";
import styles from './App.module.css';
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import CartModal from "./components/Cart/CartModal/CartModal";
import CheckoutModal from "./components/Checkout/CheckoutModal/CheckoutModal";

const App = () => {
    const [modalState, setModalState] = useState({
        cartModal: false,
        checkoutModal: false,
    });

    const openCartModal = () => {
        setModalState({
            cartModal: true,
            checkoutModal: false,
        });
    };

    const closeModals = () => {
        setModalState({
            cartModal: false,
            checkoutModal: false,
        });
    };

    const goToCheckout = () => {
        setModalState({
            cartModal: false,
            checkoutModal: true,
        });
    };

    return (
        <>
            {modalState.cartModal && <CartModal onCloseModal={closeModals} onGoToCheckout={goToCheckout} />}
            {modalState.checkoutModal && <CheckoutModal onCloseModal={closeModals} />}
            <Header onOpenCartModal={openCartModal} />
            <main className={styles.main}>
                <Meals/>
            </main>
        </>
    );
}

export default App;
