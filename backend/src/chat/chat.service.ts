import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from '../message/dto/create-message.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Message } from 'src/typeorm/message.entity'
import { Channel } from 'src/typeorm/channel.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ChatService {
	constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
		@InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>,
    ) {}

    async newMsg(createMessageDto: CreateMessageDto): Promise<Message> {
        const newMessage = this.messageRepository.create(createMessageDto)
        const isSaved = await this.messageRepository.save(newMessage)
		if (isSaved) {
			const diplay = await this.findOneToDisplay(isSaved.id)
			console.log("display" ,diplay)
			return diplay
		}	
		return null
    }

    findAll() {
        return this.messageRepository.find()
    }

	async findOneToDisplay(id: number) {
	const message = await this.messageRepository
	.createQueryBuilder('message')
		.select(['message.id', 'message.content', 'user.nickname', 'user.avatarUrl'])
		.leftJoin('message.creatorUser', 'user')
		.where('message.id = :id', { id })
		.getOne();
		return message;	
	}

	async findAllMsgByChannel(channelId: number): Promise<Message[]> {
		const messages = await this.messageRepository
			.createQueryBuilder('message')
			.select(['message.id', 'message.content', 'user.nickname', 'user.avatarUrl'])
			.leftJoin('message.creatorUser', 'user')
			.where('message.channelId = :channelId', { channelId })
			.orderBy('message.creationDate', 'ASC')
			.getMany();

  		return messages;	
	}

    async findUsersByChannel(id: number) {
        return await this.channelRepository.findOne({
            relations: {
				users: true,
				owner: true,
				admin: true
            },
            where: { id: id },
        })
    }

}
