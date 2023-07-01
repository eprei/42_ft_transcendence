import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateChannelDto } from './dto/create-channel.dto'
import { UpdateChannelDto } from './dto/update-channel.dto'
import { Channel } from 'src/typeorm/channel.entity'

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel> // <entidadQCreamos>
    ) {}

    create(createChannelDto: CreateChannelDto) {
        const channel = this.channelRepository.create(createChannelDto)
        return this.channelRepository.save(channel)
    }

    findAll() {
        return this.channelRepository.find()
    }

    findOne(id: number) {
        return `This action returns a #${id} channel`
    }

    update(id: number, updateChannelDto: UpdateChannelDto) {
        return `This action updates a #${id} channel`
    }

    remove(id: number) {
        return `This action removes a #${id} channel`
    }
}
