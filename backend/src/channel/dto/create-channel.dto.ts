import { IsNotEmpty } from 'class-validator'
import ChannelTypes from 'src/types/ChannelTypes'

export class CreateChannelDto {
    id: number
    owner: number

    @IsNotEmpty()
    name: string

    // type: ChannelTypes
    type: string

    password: string
    creationDate: string
    // creationDate: Date
    // channelUser: Player[];
}
