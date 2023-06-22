import { IsEmail, IsNotEmpty, Allow } from 'class-validator'

export class CreatePlayerDto {
    id: number

    @IsNotEmpty()
    login: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @Allow()
    avatarUrl: string

    nbVictory: number

    totalPlay: number

    xp: number
}
