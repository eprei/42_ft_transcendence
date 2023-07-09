import styles from './SendForm.module.css'

function SendForm() {
    return (
        <div className={styles.textInputWrapper}>
            <input
                className={styles.textInput}
                placeholder="Send message"
                type="text"
            />
        </div>
    )
}

export default SendForm
