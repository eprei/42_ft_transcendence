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
import { ChannelService } from './channel.service'
import { CreateChannelDto } from './dto/create-channel.dto'
import { UpdateChannelDto } from './dto/update-channel.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('channel')
@Controller('channel')
export class ChannelController {
    constructor(private readonly channelService: ChannelService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createChannelDto: CreateChannelDto) {
        return await this.channelService.create(createChannelDto)
    }

    @Get('user-channels/:id')
    async getUserChannels(@Param('id') id: string) {
        return await this.channelService.getUserChannels(+id)
    }

    @Get()
    async findAll() {
        return await this.channelService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.channelService.findOne(+id)
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateChannelDto: UpdateChannelDto
    ) {
        return await this.channelService.update(+id, updateChannelDto)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.channelService.remove(+id)
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
            console.log('Failed to remove user from channel')
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
