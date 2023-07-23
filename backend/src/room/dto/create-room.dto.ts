import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateRoomDto {
    @IsNotEmpty()
    player_one: number

    @IsOptional()
    player_two: number

    @IsOptional()
    powerup1: boolean

    @IsOptional()
    powerup2: boolean

    @IsOptional()
    powerup3: boolean

    @IsNotEmpty()
    map: string
}
