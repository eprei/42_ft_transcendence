import { Module } from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageController } from './message.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from 'src/typeorm/message.entity'
import { Channel } from 'src/typeorm/channel.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Message, Channel])],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService, TypeOrmModule],
})
export class MessageModule {}
