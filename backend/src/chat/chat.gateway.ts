import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { Server, Socket } from 'socket.io'
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

		@SubscribeMessage('findUsersByChannel')
		async findAllUsersByChannel(@MessageBody() channelId: number) {
			const chanUsers = await this.chatService.findUsersByChannel(channelId)
			return chanUsers
		}

		


}
