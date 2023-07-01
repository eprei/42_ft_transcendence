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
        const newChannel = this.channelRepository.create(createChannelDto)
        return this.channelRepository.save(newChannel)
    }

    findAll() {
        return this.channelRepository.find()
    }

    findOne(id: number) {
        return this.channelRepository.findOneBy({ id })
    }

    async update(id: number, updateChannelDto: UpdateChannelDto) {
        const channel = await this.findOne(id)

        return this.channelRepository.save({ ...channel, ...updateChannelDto })
    }

    async remove(id: number) {
        const channel = await this.findOne(id)
        return this.channelRepository.remove(channel)
    }
}
