import styles from './Input.module.css';

const Input = props => {
    const inputClasses = `${styles['form-control']} ${props.classes}`;
    return (
        <div className={inputClasses}>
            <label htmlFor={props.id}>
                {props.label}
            </label>

            <input
                id={props.id}
                name={props.name || props.id}
                type={props.type || 'text'}
                value={props.value}
                maxLength={props.maxLength || 64}
                step={props.step}
                min={props.min}
                max={props.max}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />

            {props.errorMessage ? <p className={styles['error-text']}>{props.errorMessage}</p> : null}
        </div>
    );
};

export default Input;
