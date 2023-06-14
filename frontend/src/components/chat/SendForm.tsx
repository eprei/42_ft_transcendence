import styles from './SendForm.module.css'
// import Msg from './Msg'
// import { UserProps } from './Msg'

function SendForm() {
    return (
        <>
		<div className={styles.textInputWrapper}>
    		<input placeholder="Send message" type="text" className={styles.textInput} />
		</div>
        </>
    )
}

export default SendForm
