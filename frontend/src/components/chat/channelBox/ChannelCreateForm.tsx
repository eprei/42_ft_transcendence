// import { Form, Input, Modal, Radio } from 'antd'
import { useState } from 'react'
import { Form, Input, Modal, Radio } from 'antd'
import { CreateChannel } from '../../../types/CreateChannel'
import channelType from '../../../types/ChannelType'
import { useAppSelector } from '../../../store/types'
import { UserData } from '../../../types/UserData'

interface ChannelCreateFormProps {
    open: boolean
    onCreate: (values: CreateChannel) => void
    onCancel: () => void
}

const ChannelCreateForm = ({
    open,
    onCreate,
    onCancel,
}: ChannelCreateFormProps) => {
    const [form] = Form.useForm()
    const userData = useAppSelector((state) => state.user.userData) as UserData
    const [isPrivate, setIsPrivate] = useState<boolean>(false)
    console.log(userData.user.id)

    let showPassword: JSX.Element | null = null

    const togglePass = () => {
        setIsPrivate(!isPrivate)
    }

    const createNewChannel = () => {
        form.validateFields()
            .then((values) => {
                console.log('values of form: ', userData.user.id)
                form.resetFields()
                const newChannel: CreateChannel = {
                    ownerId: userData.user.id,
                    name: values.chName,
                    type: values.type,
                    password: values.password,
                }
                onCreate(newChannel)
                setIsPrivate(false)
            })
            .catch((info) => {
                console.log('Validate Failed:', info)
            })
    }

    if (isPrivate) {
        showPassword = (
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please type your password',
                    },
                ]}
            >
                <Input type="textarea" />
            </Form.Item>
        )
    }

    return (
        <Modal
            open={open}
            title="Create new Channel"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={createNewChannel}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ type: 'public' }}
            >
                <Form.Item
                    name="chName"
                    label="Channel name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the channel name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {showPassword}
                <Form.Item
                    name="type"
                    className="collection-create-form_last-form-item"
                >
                    <Radio.Group onChange={togglePass}>
                        <Radio value={channelType.Public}>Public</Radio>
                        <Radio value={channelType.Private}>Private</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChannelCreateForm
