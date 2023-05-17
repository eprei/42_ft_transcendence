import { Controller, Get, Post, Put, Delete } from '@nestjs/common'

@Controller('ninjas')
export class NinjasController {
    @Get()
    getNinjas() {
        return []
    }

    @Get(':id')
    getOneNinja() {
        return {}
    }

    @Post()
    createNinja() {
        return {}
    }

    @Put
    updateNinja() {
        return {}
    }
    @Delete
    removeNinja() {
        return {}
    }
}
