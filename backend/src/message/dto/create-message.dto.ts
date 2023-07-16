import { IsNotEmpty, IsOptional } from 'class-validator'
import { Channel } from 'src/typeorm/channel.entity'

export class CreateMessageDto {
    @IsNotEmpty()
    creator: number

    @IsNotEmpty()
    content: string

    @IsOptional()
    creationDate: Date

	@IsOptional()
	channelId: Channel
}
