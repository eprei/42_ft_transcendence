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
        const channel = await this.channelService.create(createChannelDto)
        return channel
    }

	// create(@Body() createChannelDto: CreateChannelDto) {
    //     return this.channelService.create(createChannelDto)
    // }

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
}
