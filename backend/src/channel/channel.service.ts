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
        return this.channelRepository.find({
            relations: ['users', 'admin', 'messages'],
        })
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
        const user = await this.userRepository.findOneBy({ id: userId })

        if (!user) {
            return []
        }
        const channels = await this.channelRepository
            .createQueryBuilder('channel')
            .leftJoinAndSelect('channel.users', 'user')
            .where('user.id = :userId', { userId })
            .getMany()
        return channels
    }

    async removeUserFromChannel(channelId: number, userId: number): Promise<void> {
        const channel = await this.channelRepository.findOne(channelId, { relations: ['users'] });
        
        if (!channel) {
          throw new NotFoundException('Channel not found');
        }
      
        const userToRemove = channel.users.find((user) => user.id === userId);
      
        if (!userToRemove) {
          throw new NotFoundException('User not found in channel');
        }
      
        channel.users = channel.users.filter((user) => user.id !== userId);
      
        await this.channelRepository.save(channel);
      }
}
