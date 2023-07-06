import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
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
        const newMessage = this.messageRepository.create(createMessageDto)
        return this.messageRepository.save(newMessage)
    }

    findAll() {
        return this.messageRepository.find()
    }
}
