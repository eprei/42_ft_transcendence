import { IsNotEmpty, IsOptional } from 'class-validator'
import { Player } from '../../typeorm/player.entity'

export class CreateMatchDto {
    @IsOptional()
    id?: number

    @IsNotEmpty()
    playerHome: Player

    @IsNotEmpty()
    playerForeign: Player

    @IsNotEmpty()
    winner: Player

    @IsNotEmpty()
    homeScore: number

    @IsNotEmpty()
    foreignScore: number

    @IsOptional()
    timestamp: Date
}
