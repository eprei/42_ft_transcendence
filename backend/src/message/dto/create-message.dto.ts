import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateMessageDto {

    @IsOptional()
    id: number

    @IsNotEmpty()
    creator: number

    @IsNotEmpty()
    content: string

    @IsOptional()
    creationDate: Date
}
