import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Param,
    Inject,
} from '@nestjs/common'
import { MessageService } from './message.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Message } from 'src/typeorm/message.entity'
import { Channel } from 'src/typeorm/channel.entity'
// import { User } from 'src/typeorm/user.entity'
// import { DeepPartial } from 'typeorm';

@ApiTags('message')
@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>
    ) {}
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,

    @Post('channelId/:id')
    @UsePipes(ValidationPipe)
    async create(
        @Param('id') id: string,
        @Body() createMessageDto: CreateMessageDto
    ) {
        const chan = await this.channelRepository.findOneBy({ id: +id })
        ;(createMessageDto.creationDate = new Date()),
            (createMessageDto.channel = chan)
        return await this.messageService.create(createMessageDto)
    }

	// async create(@Param('id') id: string, @Body() newMsg: DeepPartial<Message> ) {
	@Post('channelId/:id')
    @UsePipes(ValidationPipe)
		async create(@Param('id') id: string, @Body() creator: number, @Body() content: string) {
		// const message = await this.messageService.create(+id, creator, content)
		// const user = await this.userRepository.findOneBy({ id: newMsg.creator })
		// newMsg.creator = +newMsg.creator
		const chan = await this.channelRepository.findOneBy({ id: +id })

		const message : DeepPartial<Message>= {
			creator: +creator,
			content: content,
			creationDate: new Date(),
			channelId: chan
		}
		this.messageRepository.save(message)
	}
	// creator,
	// content,
	// creationDate: new Date(),
	// channelId: +id,

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
