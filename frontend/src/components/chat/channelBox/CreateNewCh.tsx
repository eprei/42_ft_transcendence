import { useState } from 'react'
import IconAddChannel from '../../../assets/icon/add_friend.svg'
import styles from './CreateNewCh.module.css'
import { CreateChannel } from '../../../types/CreateChannel'
import NewChannelForm from '../../ui/modal/NewChannelForm'

interface CreateNewChProps {
    handleCreation: (channel: CreateChannel) => void
}

const CreateNewCh = ({ handleCreation }: CreateNewChProps) => {
    const [open, setOpen] = useState(false)

    const onCreate = (values: CreateChannel) => {
        setOpen(false)
        handleCreation(values)
    }

    return (
        <>
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
            </div>
            {open && (
                <NewChannelForm
                    onCreate={onCreate}
                    onCancel={() => setOpen(false)}
                />
            )}
        </>
    )
}

export default CreateNewCh
