import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from 'src/typeorm/message.entity'
import { Repository } from 'typeorm'


@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private readonly playerRepository: Repository<Message>
    ) {}

    create(createMessageDto: CreateMessageDto) {
        return 'This action adds a new message'
    }

    findAll() {
        return `This action returns all message`
    }

    findOne(id: number) {
        return `This action returns a #${id} message`
    }

    // remove(id: number) {
    //     return `This action removes a #${id} message`
    // }
}
