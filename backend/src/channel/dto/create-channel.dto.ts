import { IsNotEmpty,IsOptional } from 'class-validator'

export class CreateChannelDto {
    @IsOptional()
    id: number

    @IsNotEmpty()
    owner: number

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    type: string
    
    @IsOptional()
    password: string

}
