import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
} from '@nestjs/common'
import { MatchService } from './match.service'
import { CreateMatchDto } from './dto/create-match.dto'
import { UpdateMatchDto } from './dto/update-match.dto'
import { ApiTags } from '@nestjs/swagger'
import { Match } from 'src/typeorm/match.entity'

@ApiTags('match')
@Controller('match')
export class MatchController {
    constructor(private readonly matchService: MatchService) {}

    @Post()
    async create(@Body() createMatchDto: CreateMatchDto) {
        const match = await this.matchService.create(createMatchDto)
        return match
    }

    @Get()
    async findAll() {
        const matches = await this.matchService.findAll()
        return matches
    }

    @Get('user')
    async findByUserId(@Request() req : any) {
        const matches = await this.matchService.findByUserId(req.user.id)
        return matches
    }
    
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const match = await this.matchService.findOne(+id)
        return match
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateMatchDto: UpdateMatchDto
    ) {
        const match = await this.matchService.update(+id, updateMatchDto)
        return match
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.matchService.remove(+id)
        return `Match with ID ${id} has been removed`
    }
}
