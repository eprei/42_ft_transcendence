import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Query,
	Body
} from '@nestjs/common'
import { CreateNinjaDto } from './dto/create-ninja.dto'
import { UpdateNinjaDto } from './dto/update-ninja.dto'
import { NinjasService } from './ninjas.service'

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService) {}

    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
        return this.ninjasService.getNinjas(weapon);
    }

    @Get(':id')
    getOneNinja(@Param('id') id: string) {
        return { id }
    }

    @Post()
    createNinja(@Body() createNinjaDto: CreateNinjaDto) {
        return {
            name_received: createNinjaDto.name,
        }
    }

    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinja: UpdateNinjaDto) {
        return {}
    }
    @Delete(':id')
    removeNinja(@Param('id') id: string) {
        return {}
    }
}
