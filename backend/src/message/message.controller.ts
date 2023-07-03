import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { MessageService } from './message.service'
import { CreateMessageDto } from './dto/create-message.dto'

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createMessageDto: CreateMessageDto) {
        const newMsg = await this.messageService.create(createMessageDto)
        return newMsg
    }

    @Get()
    async findAll() {
        const msg = await this.messageService.findAll()
        return msg
    }
}
