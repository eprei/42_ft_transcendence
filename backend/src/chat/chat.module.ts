import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from 'src/typeorm/message.entity'
import { MessageService } from 'src/message/message.service'

@Module({
    providers: [ChatGateway, ChatService, MessageService],
	imports: [TypeOrmModule.forFeature([Message])],
})
export class ChatModule {}
