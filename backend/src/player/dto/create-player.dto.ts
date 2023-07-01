import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreatePlayerDto {
    @IsOptional()
    id: number

    @IsNotEmpty()
    login: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsOptional()
    avatarUrl: string

    @IsOptional()
    nbVictory: number

    @IsOptional()
    totalPlay: number

    @IsOptional()
    xp: number
}
