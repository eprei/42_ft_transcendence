import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { Server } from 'socket.io'
import { CreateMessageDto } from 'src/message/dto/create-message.dto'
import { UsePipes, ValidationPipe, Post, Body, Param, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Channel } from 'src/typeorm/channel.entity'
import { Repository } from 'typeorm'
import { WebSocketServer } from '@nestjs/websockets'

@WebSocketGateway({
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	}
})

export class ChatGateway {
	@WebSocketServer()
	server: Server
	
    constructor(
		private readonly chatService: ChatService,
		@InjectRepository(Channel)
		private readonly channelRepository: Repository<Channel>
		) {}

		@SubscribeMessage('Hello')
		hello ()
		{
			console.log('Hello my friend')
			return 'Hello'
		}

		@SubscribeMessage('postMsg')
		@UsePipes(ValidationPipe)
		async postMsg(@MessageBody() createMessageDto: CreateMessageDto) {
			const chan = await this.channelRepository.findOneBy({ id: createMessageDto.chanId })
			createMessageDto.creationDate = new Date(),
			createMessageDto.channel = chan
			const msgSended = await this.chatService.newMsg(createMessageDto)
			if (msgSended) {
				this.server.emit('incomingMessage', msgSended)
				return msgSended
			}
			else {
				return null
			}
		}

		@SubscribeMessage('findAllMsgByChannel')
		async findAllMsgByChannel(@MessageBody() channelId: number) {
			const chanMsg = await this.chatService.findAllMsgByChannel(channelId)
			return chanMsg
		}

	    // @SubscribeMessage('createChat')
//     // create(@MessageBody() createChatDto: CreateChatDto) {
//     //   return this.chatService.create(createChatDto);
//     // }

//     @SubscribeMessage('findAllChat')
//     findAll() {
//         return this.chatService.findAll()
//     }

//     @SubscribeMessage('findOneChat')
//     findOne(@MessageBody() id: number) {
//         return this.chatService.findOne(id)
//     }

//     @SubscribeMessage('updateChat')
//     // update(@MessageBody() updateChatDto: UpdateChatDto) {
//     //   return this.chatService.update(updateChatDto.id, updateChatDto);
//     // }
//     @SubscribeMessage('removeChat')
//     remove(@MessageBody() id: number) {
//         return this.chatService.remove(id)
//     }
}
