import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from '../../typeorm/user.entity'

export class CreateMatchDto {
    @IsNotEmpty()
    userHome: User

    @IsNotEmpty()
    userForeign: User

    @IsNotEmpty()
    winner: User

    @IsNotEmpty()
    homeScore: number

    @IsNotEmpty()
    foreignScore: number

    @IsOptional()
    timestamp: Date
}
