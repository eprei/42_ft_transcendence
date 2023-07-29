import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Param,
} from '@nestjs/common'
import { MessageService } from './message.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('message')
@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
    ) {}

    @Post('channelId/:id')
    @UsePipes(ValidationPipe)
    async create(
        @Param('id') id: string,
        @Body() createMessageDto: CreateMessageDto
    ) {
        //     const chan = await this.channelRepository.findOneBy({ id: +id })
        //     ;(createMessageDto.creationDate = new Date()),
        //         (createMessageDto.channel = chan)
        //     return await this.messageService.create(createMessageDto)
        // }
        // const user = await this.userRepository.findOneBy({
        // 	id: createMessageDto.creator,
        // })
        // const { nickname, avatarUrl } = user
        // createMessageDto.userNickname = nickname
        // createMessageDto.userAvatarUrl = avatarUrl
        const msgSended = await this.messageService.create(createMessageDto)
    }

    @Get()
    async findAll() {
        const msg = await this.messageService.findAll()
        return msg
    }

    @Get(':id/msg')
    async getMsgFromChannel(@Param('id') id: string) {
        return await this.messageService.findAllByChannel(+id)
    }
}
