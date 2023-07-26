import { useState } from 'react'
import styles from '../ChannelLi.module.css'
import { Channel } from '../../../../types/Channel'
import IconLeaveChannel from '../../../../assets/icon/block_user.svg'
import IconPrivate from '../../../../assets/icon/lock.svg'
import ChannelType from '../../../../types/ChannelType'
import { useAppDispatch, useAppSelector } from '../../../../store/types'
import { UserData } from '../../../../types/UserData'
import { chatActions } from '../../../../store/chat'
import { Modal } from 'antd'

interface JoinedItemProps {
    channel: Channel
    deleteChannel: (channelId: number) => void
    leaveChannel: (channelId: number) => void
}

const JoinedItem = (props: JoinedItemProps) => {
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const currentChatSelected = useAppSelector(
        (state) => state.chat.currentChatSelected
    ) as number
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [isOwner, setIsOwner] = useState(false)

    const handleClick = () => {
        dispatch(chatActions.selectChat(props.channel.id))
    }

    const LeaveChannel = () => {
        props.leaveChannel(props.channel.id)
    }
    const deleteChannel = () => {
        props.deleteChannel(props.channel.id)
    }
    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            if (isOwner) {
                deleteChannel()
            } else {
                LeaveChannel()
            }
            setOpen(false)
            setConfirmLoading(false)
            setIsOwner(false)
        }, 1000)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const showModal = () => {
        if (props.channel.owner.id === userData.user.id) {
            setIsOwner(true)
        }
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
                {!isOwner && (
                    <p>{`Are you sure you want to leave ${props.channel.name}?`}</p>
                )}
                {isOwner && (
                    <div>
                        <p>You are the owner of this channel.</p>
                        <p>If you leave, the channel will be deleted.</p>
                        <p>Continue?</p>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default JoinedItem
