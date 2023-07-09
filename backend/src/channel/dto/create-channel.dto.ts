import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from 'src/typeorm/user.entity'

export class CreateChannelDto {
    @IsNotEmpty()
    owner: User

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    type: string

    @IsOptional()
    password: string
}
