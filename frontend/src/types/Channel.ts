import ChannelTypes from "./ChannelTypes"

export interface Channel {
    id: number
    owner: number
    name: string
    type: ChannelTypes
    password: string
}
