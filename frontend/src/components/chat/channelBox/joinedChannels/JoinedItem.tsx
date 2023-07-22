import { useState } from 'react'
import styles from '../ChannelLi.module.css'
import { Channel } from '../../../../types/Channel'
import IconLeaveChannel from '../../../../assets/icon/block_user.svg'
import IconPrivate from '../../../../assets/icon/lock.svg'
import ChannelType from '../../../../types/ChannelType'
import { useAppDispatch, useAppSelector } from '../../../../store/types'
import { UserData } from '../../../../types/UserData'
import { io } from 'socket.io-client'
import { chatActions } from '../../../../store/chat'
import { Modal } from 'antd'

interface JoinedItemProps {
    channel: Channel
    getAllChannels: () => void
}

const JoinedItem = (props: JoinedItemProps) => {
    const socket = io('http://localhost:8080')
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const handleClick = () => {
        dispatch(chatActions.selectChat(props.channel.id))
    }

    const LeaveChannel = () => {
        socket.emit('leaveChannel', props.channel.id, userData.user.id, () => {
            dispatch(chatActions.selectChat(0))
            props.getAllChannels()
        })
    }
    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            LeaveChannel()
            setOpen(false)
            setConfirmLoading(false)
        }, 1000)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const showModal = () => {
        setOpen(true)
    }

    return (
        <>
            <li
                className={`${styles.li} ${
                    props.channel.id === currentChatSelected
                        ? styles.active
                        : ''
                }`}
                onClick={handleClick}
            >
                <div className={styles.text}>{props.channel.name}</div>
                <div className={styles.iconsContainer}>
                    {
                        <img
                            src={IconLeaveChannel}
                            alt="LeaveChannel"
                            className={styles.addChannelIcon}
                            onClick={showModal}
                        />
                    }
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
                <p>{`Are you sure you want to leave ${props.channel.name}?`}</p>
            </Modal>
        </>
    )
}

export default JoinedItem
