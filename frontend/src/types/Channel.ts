import ChannelTypes from "./ChannelTypes"

export interface Channel {
    owner: number
    name: string
    type: ChannelTypes
    password: string
}
