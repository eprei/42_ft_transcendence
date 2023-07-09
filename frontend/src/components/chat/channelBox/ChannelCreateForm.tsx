import { Channel } from '../../../types/Channel'

interface ChannelCreateFormProps {
    open: boolean
    onCreate: (values: Channel) => void
    onCancel: () => void
}

const ChannelCreateForm = ({}: ChannelCreateFormProps) => {
    return <></>
}

export default ChannelCreateForm
