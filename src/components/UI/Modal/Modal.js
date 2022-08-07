import styles from './Modal.module.css';
import ReactDOM from 'react-dom';

const ModalBackDrop = props => {
  return <div className={styles.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = props => {
    return (
        <div className={styles.modal}>
            {props.children}
        </div>
    );
};

const Modal = props => {
    const portalElement = document.querySelector('body');
    const modalOutsideClickHandler = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            {ReactDOM.createPortal(<ModalBackDrop onClick={modalOutsideClickHandler} />, portalElement)}
            {ReactDOM.createPortal(
                <ModalOverlay onCloseModal={props.onCloseModal}>
                    {props.children}
                </ModalOverlay>,
                portalElement
            )}
        </>
    );
};

export default Modal;
