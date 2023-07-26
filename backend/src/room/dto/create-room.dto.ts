import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateRoomDto {
    @IsNotEmpty()
    theme: string
}
