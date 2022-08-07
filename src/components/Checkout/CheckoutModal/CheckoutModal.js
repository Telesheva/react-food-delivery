import Modal from "../../UI/Modal/Modal";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const CheckoutModal = props => {
    return (
      <Modal onCloseModal={props.onCloseModal}>
          <CheckoutForm onCloseModal={props.onCloseModal} />
      </Modal>
    );
};

export default CheckoutModal;
