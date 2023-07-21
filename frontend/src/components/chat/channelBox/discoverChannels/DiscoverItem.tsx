import { useState } from 'react'
import styles from '../ChannelLi.module.css'
import { Channel } from '../../../../types/Channel'
import IconPrivate from '../../../../assets/icon/lock.svg'
import ChannelType from '../../../../types/ChannelType'
import { useAppDispatch, useAppSelector } from '../../../../store/types'
import { UserData } from '../../../../types/UserData'
import { io } from 'socket.io-client'
import { chatActions } from '../../../../store/chat'
import { Modal } from 'antd'
import Input from './Input'

interface DiscoverItemProps {
    channel: Channel
    getAllChannels: () => void
}

const DiscoverItem = (props: DiscoverItemProps) => {
    const socket = io('http://localhost:8080')
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number
    const dispatch = useAppDispatch()
    const joinChannel = (password: string) => {
        socket.emit(
            'joinChannel',
            props.channel.id,
            userData.user.id,
            password,
            () => {
                dispatch(chatActions.selectChat(props.channel.id))
                props.getAllChannels()
            }
        )
    }

    const showModal = () => {
        if (props.channel.type === ChannelType.Private) {
            setShowInput(true)
        }
        setOpen(true)
    }

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            if (props.channel.type === ChannelType.Private) {
                joinChannel(inputValue)
            } else {
                joinChannel('')
            }
            setOpen(false)
            setConfirmLoading(false)
        }, 1000)
        setShowInput(false)
        setInputValue('')
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    return (
        <>
            <li
                className={`${styles.li} ${
                    props.channel.id === currentChatSelected
                        ? styles.active
                        : ''
                }`}
                onClick={showModal}
            >
                <div className={styles.text}>{props.channel.name}</div>
                <div className={styles.iconsContainer}>
                    {props.channel.type === ChannelType.Private ? (
                        <img
                            src={IconPrivate}
                            alt="Private Channel"
                            className={styles.privateIcon}
                        />
                    ) : null}
                </div>
            </li>
            <Modal
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{`Do you want to join ${props.channel.name}?`}</p>
                {showInput && (
                    <Input
                        placeholder="Enter Channel password"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                )}
            </Modal>
        </>
    )
}

export default DiscoverItem
