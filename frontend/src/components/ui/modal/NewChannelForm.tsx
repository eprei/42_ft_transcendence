import ReactDOM from 'react-dom'
import { useState } from 'react'
import Backdrop from './Backdrop'
import Card from '../Card'
import styles from './NewChannelForm.module.css'
import { CreateChannel } from '../../../types/CreateChannel'
import { UserData } from '../../../types/UserData'
import { useAppSelector } from '../../../store/types'

interface Props {
    onCreate: (values: CreateChannel) => void
    onCancel: () => void
}

const Form = (props: Props) => {
    const [inputChannelValue, setInputChannelValue] = useState('')
    const [inputPasswordValue, setInputPasswordValue] = useState('')
    const [channelType, setChannelType] = useState('public')
    const [enteredDataIsValid, setEnteredDataIsValid] = useState<boolean>(true)
    const userData = useAppSelector((state) => state.user.userData) as UserData

    const onOk = () => {
        const isValid = checkInputValues()
        if (isValid) {
            const newChannel = {
                ownerId: userData.user.id,
                name: inputChannelValue.trim(),
                type: channelType,
                password: inputPasswordValue.trim(),
            }
            props.onCreate(newChannel)
            setInputChannelValue('')
            setInputPasswordValue('')
        }
    }

    const checkInputValues = () => {
        if (channelType === 'public' && inputChannelValue.trim() === '') {
            console.log('inputChannelValue is empty')
            setEnteredDataIsValid(false)
            return false
        } else if (
            (channelType === 'private' && inputPasswordValue.trim() === '') ||
            inputChannelValue.trim() === ''
        ) {
            console.log('inputPasswordValue is empty')
            setEnteredDataIsValid(false)
            return false
        }
        return true
    }

    const handleChannelInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputChannelValue(event.target.value)
    }
    const handlePasswordInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputPasswordValue(event.target.value)
    }

    return (
        <Card className={styles.modal}>
            <form onSubmit={(event) => event.preventDefault()}>
                <header className={styles.header}>
                    <h4>Create new Channel</h4>
                </header>
                <div className={styles.formControl}>
                    <input
                        type="text"
                        onChange={handleChannelInputChange}
                        placeholder="Enter Channel name"
                        autoComplete="off"
                    />
                    {!enteredDataIsValid && (
                        <p className={styles.error}>Channel name is required</p>
                    )}
                </div>
                <div className={styles.radioControl}>
                    <input
                        type="radio"
                        value="public"
                        checked={channelType === 'public'}
                        onChange={() => setChannelType('public')}
                    />{' '}
                    Public
                    <input
                        type="radio"
                        name="channelType"
                        value="private"
                        checked={channelType === 'private'}
                        onChange={() => setChannelType('private')}
                    />{' '}
                    Private
                </div>
                {channelType === 'private' && (
                    <div className={styles.formControl}>
                        <input
                            type="text"
                            onChange={handlePasswordInputChange}
                            placeholder="Enter Channel password"
                            autoComplete="off"
                        />
                        {!enteredDataIsValid && (
                            <p className={styles.error}>Password is required</p>
                        )}
                    </div>
                )}
                <div className={styles.formActions}>
                    <button className={styles.confirmBtn} onClick={onOk}>
                        Create
                    </button>
                    <button
                        className={styles.cancelBtn}
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Card>
    )
}

const NewChannelForm = (props: Props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById('backdrop')!
            )}
            {ReactDOM.createPortal(
                <Form onCreate={props.onCreate} onCancel={props.onCancel} />,
                document.getElementById('modal')!
            )}
        </>
    )
}

export default NewChannelForm
