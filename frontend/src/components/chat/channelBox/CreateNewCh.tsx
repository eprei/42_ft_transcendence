import { useState } from 'react'
import IconAddChannel from '../../../assets/icon/add_friend.svg'
import styles from './CreateNewCh.module.css'
import ChannelCreateForm from './ChannelCreateForm'
import { CreateChannel } from '../../../types/CreateChannel'

interface CreateNewChProps {
    handleCreation: (channel: CreateChannel) => void
}

const CreateNewCh = ({ handleCreation }: CreateNewChProps) => {
    const [open, setOpen] = useState(false)

    const onCreate = (values: CreateChannel) => {
        console.log('Received values of form: ', values)
        setOpen(false)
        handleCreation(values)
    }

    return (
        <div className={styles.channelBox}>
            <button
                className={styles.btn}
                onClick={() => {
                    setOpen(true)
                }}
            >
                New channel
                <img
                    src={IconAddChannel}
                    alt="plus sign"
                    className={styles.addChannelIcon}
                />
            </button>
            <ChannelCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </div>
    )
}

export default CreateNewCh
