import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateMatchDto {
    @IsOptional()
    id: number

    @IsNotEmpty()
    playerHome: number

    @IsNotEmpty()
    playerForeign: number

    @IsNotEmpty()
    winner: number

    @IsNotEmpty()
    homeScore: number

    @IsNotEmpty()
    foreignScore: number

    @IsOptional()
    timestamp: Date
}
