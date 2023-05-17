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

@Controller('ninjas')
export class NinjasController {
    @Get()
    getNinjas(@Query('type') type: string) {
        return [{ type }]
    }

    @Get(':id')
    getOneNinja(@Param('id') id: string) {
        return { id }
    }

    @Post()
    createNinja(@Body() createNinjaDto) {
        return {}
    }

    @Put(':id')
    updateNinja(@Param('id') id: string) {
        return {}
    }
    @Delete(':id')
    removeNinja(@Param('id') id: string) {
        return {}
    }
}
