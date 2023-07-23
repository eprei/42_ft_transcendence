import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from 'src/typeorm/user.entity'

export class CreateChannelDto {
    @IsOptional()
    owner: User

    @IsOptional()
    ownerId: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    type: string

    @IsOptional()
    password: string

    @IsOptional()
    admin: User[]
    // admin: User

    @IsOptional()
    users: User[]
}
