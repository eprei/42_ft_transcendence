import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/typeorm/user.entity'
import { Repository } from 'typeorm'
import { ChannelService } from './channel.service'
import { CreateChannelDto } from './dto/create-channel.dto'
import { UpdateChannelDto } from './dto/update-channel.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
    constructor(
        private readonly channelService: ChannelService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createChannelDto: CreateChannelDto) {
        const user = await this.userRepository.findOneBy({
            id: createChannelDto.ownerId,
        })
        createChannelDto.owner = user
        createChannelDto.admin = [user]
        createChannelDto.users = [user]
        const channel = await this.channelService.create(createChannelDto)
        return channel
    }

    @Get('user-channels/:id')
    async getUserChannels(@Param('id') id: string) {
        const channels = await this.channelService.getUserChannels(+id)
        return channels
    }

    @Get()
    async findAll() {
        const channels = await this.channelService.findAll()
        return channels
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const channel = await this.channelService.findOne(+id)
        return channel
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateChannelDto: UpdateChannelDto
    ) {
        const channel = await this.channelService.update(+id, updateChannelDto)
        return channel
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const channel = await this.channelService.remove(+id)
        return channel
    }

    @Delete(':channelId/users/:userId')
    async removeUserFromChannel(
        @Param('channelId') channelId: number,
        @Param('userId') userId: number
    ) {
        try {
            await this.channelService.removeUserFromChannel(channelId, userId)
            return { message: 'User removed from channel successfully' }
        } catch (error) {
            throw new Error('Failed to remove user from channel')
        }
    }

    @Get(':id/users')
    async getChannelUsers(@Param('id') id: string) {
        return await this.channelService.getChannelUsers(+id)
    }

    @Get(':id/msg')
    async getChannelMsg(@Param('id') id: string) {
        return await this.channelService.getChannelMsg(+id)
    }
}
