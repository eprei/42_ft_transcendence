// import { Form, Input, Modal, Radio } from 'antd'
import { useState } from 'react'
import { Form, Input, Modal, Radio } from 'antd'
import { Channel } from '../../../types/Channel'
import channelType from '../../../types/ChannelTypes'

interface ChannelCreateFormProps {
    open: boolean
    onCreate: (values: Channel) => void
    onCancel: () => void
}

const ChannelCreateForm = ({
    open,
    onCreate,
    onCancel,
}: ChannelCreateFormProps) => {
    const [form] = Form.useForm()

    const [isPrivate, setIsPrivate] = useState<boolean>(false)

    let showPassword: JSX.Element | null = null

    const togglePass = () => {
        setIsPrivate(!isPrivate)
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
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields()
                        const newChannel: Channel = {
                            owner: Math.floor(Math.random() * 1000), //user.id
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
            }}
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
