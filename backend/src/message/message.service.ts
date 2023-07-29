import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from '../chat/dto/create-message.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from 'src/typeorm/message.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) {}

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        console.log(createMessageDto)
        const newMessage = this.messageRepository.create(createMessageDto)
        return this.messageRepository.save(newMessage)
    }

    findAll() {
        return this.messageRepository.find()
    }

    async findAllByChannel(channelId: number) {
        const messages = await this.messageRepository
            .createQueryBuilder('message')
            .select([
                'message.id',
                'message.content',
                'user.nickname',
                'user.avatarUrl',
            ])
            .leftJoin('message.creatorUser', 'user')
            .where('message.channelId = :channelId', { channelId })
            .getMany()

        return messages
    }
}
