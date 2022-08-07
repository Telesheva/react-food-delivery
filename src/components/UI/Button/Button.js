import styles from './Button.module.css';

const Button = props => {
    return (
        <button
            type={props.type}
            className={props.isOutline ? styles['button-outline'] : styles.button}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button;
