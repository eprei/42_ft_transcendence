import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { PlayerService } from './player.service'
import { CreatePlayerDto } from './dto/create-player.dto'

@Controller('player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createPlayerDto: CreatePlayerDto) {
        console.log(createPlayerDto)
        const player = this.playerService.create(createPlayerDto)
        return player
    }

    @Get()
    async findAll() {
        const player = await this.playerService.findAll()
        return player
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.playerService.findOne(+id)
    }

    @Delete(':login')
    remove(@Param('login') login: string) {
        console.log(login)
        return this.playerService.remove(login)
    }
}
