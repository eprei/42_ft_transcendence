import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateMessageDto {
    @IsNotEmpty()
    creator: number

    @IsNotEmpty()
    content: string

    @IsOptional()
    creationDate: Date

	// @IsNotEmpty()
	// channelId: number
}
