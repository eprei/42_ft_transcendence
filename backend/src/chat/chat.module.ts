import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from 'src/typeorm/message.entity'
import { Channel } from 'src/typeorm/channel.entity'

@Module({
    providers: [ChatGateway, ChatService],
	imports: [TypeOrmModule.forFeature([Message]), TypeOrmModule.forFeature([Channel])],
})
export class ChatModule {}
