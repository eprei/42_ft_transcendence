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
        const user = await this.playerService.create(createPlayerDto)
        return user
    }

    @Get()
    async findAll() {
        const users = await this.playerService.findAll()
        return users
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.playerService.findOne(+id)
        return user
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() createPlayerDto: CreatePlayerDto
    ) {
        const user = await this.playerService.update(+id, createPlayerDto)
        return user
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const user = await this.playerService.remove(+id)
        return user
    }
}
