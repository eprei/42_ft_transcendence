import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateChannelDto } from './dto/create-channel.dto'
import { UpdateChannelDto } from './dto/update-channel.dto'
import { Channel } from 'src/typeorm/channel.entity'
import { User } from 'src/typeorm/user.entity'

@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel)
        private readonly channelRepository: Repository<Channel>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    create(createChannelDto: CreateChannelDto) {
        const newChannel = this.channelRepository.create(createChannelDto)
        return this.channelRepository.save(newChannel)
    }

    findAll() {
        return this.channelRepository.find()
    }

    findOne(id: number) {
        return this.channelRepository.findOneBy({ id: id })
    }

    async update(id: number, updateChannelDto: UpdateChannelDto) {
        const channel = await this.findOne(id)

        return this.channelRepository.save({ ...channel, ...updateChannelDto })
    }

    async remove(id: number) {
        const channel = await this.findOne(id)
        return this.channelRepository.remove(channel)
    }

    async getUserChannels(userId: number) {
        const user = await this.userRepository.findOneBy({id: userId});

        console.log(`User: ${user}`);
  
        if (!user) {
          throw new NotFoundException('User not found');
        }
      
        const channels = await this.channelRepository
          .createQueryBuilder('channel')
          .leftJoinAndSelect('channel.users', 'user')
          .where('user.id = :userId', { userId })
          .getMany();
        console.log(`Channels: ${channels}`);
        return channels;
    }
}
