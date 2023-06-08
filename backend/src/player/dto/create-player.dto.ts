import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreatePlayerDto {
    id: number

    @IsNotEmpty()
    login: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    avatarUrl: string

    nbVictory: number

    totalPlay: number

    xp: number
}
