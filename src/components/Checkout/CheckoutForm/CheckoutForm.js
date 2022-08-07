import { useContext } from "react";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutForm.module.css";
import CartContext from "../../../store/cart-context";
import Input from "../../UI/Input/Input";
import { useFormik } from 'formik';

const CheckoutForm = props => {
    const cartContext = useContext(CartContext);
    const totalAmount = `$${cartContext.totalPrice.toFixed(2)}`;
    const initialFormState = {
        name: '',
        surname: '',
        email: '',
        address: '',
        people: 1,
    };

    const completeOrderHandler = async (values) => {
        await fetch('https://react-food-delivery-b82d5-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify(values),
        });
        cartContext.resetCart();
        props.onCloseModal();
    };

    const validateForm = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Name is required!';
        }

        if (!values.surname) {
            errors.surname = 'Surname is required!';
        }

        if (!values.address) {
            errors.address = 'Address is required!';
        }

        if (!values.people) {
            errors.people = 'Please enter an amount of people!';
        } else if (values.people < 0 || isNaN(values.people)) {
            errors.people = 'Please enter an amount of people!';
        }


        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Please enter a valid email address!';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: initialFormState,
        validate: validateForm,
        onSubmit: completeOrderHandler,
    });

    const hasErrors = Object.entries(formik.errors).length > 0;
    const isFormTouched = Object.entries(formik.touched).length > 0;
    const isSubmitDisabled = (hasErrors && isFormTouched) || !isFormTouched;

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.total}>
                <strong>Total amount: </strong>
                <p>{totalAmount}</p>
            </div>

            <Input
                id="name"
                name="name"
                label="Name: "
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.name && formik.errors.name}
            />

            <Input
                id="surname"
                name="surname"
                label="Surname: "
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.surname && formik.errors.surname}
            />

            <Input
                id="email"
                name="email"
                type="email"
                label="Email: "
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.email && formik.errors.email}
            />

            <Input
                id="address"
                name="address"
                label="Address: "
                maxLength="100"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.address && formik.errors.address}
            />

            <Input
                id="people"
                name="people"
                type="number"
                step="1" min="1"
                label="How many people?"
                value={formik.values.people}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.touched.people && formik.errors.people}
            />

            <div className={styles['modal-footer']}>
                <Button isOutline={true} onClick={props.onCloseModal}>Close</Button>
                <Button type="submit" disabled={isSubmitDisabled}>Proceed</Button>
            </div>
        </form>
    );
};

export default CheckoutForm;
