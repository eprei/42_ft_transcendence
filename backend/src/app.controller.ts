import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async getHello(): Promise<string> {
        console.log('Seed starting')
        await this.appService.seed()
        console.log('Seed ended')
        return 'Seed complete'
    }
}
