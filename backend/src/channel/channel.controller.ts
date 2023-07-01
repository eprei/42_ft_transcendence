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

@Controller('channel')
export class ChannelController {
    constructor(private readonly channelService: ChannelService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createChannelDto: CreateChannelDto) {
        console.log(createChannelDto)
        const channel = this.channelService.create(createChannelDto)
        return channel
    }

    // create(@Body() createChannelDto: CreateChannelDto) {
    //     return this.channelService.create(createChannelDto)
    // }

    @Get()
    findAll() {
        return this.channelService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.channelService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateChannelDto: UpdateChannelDto
    ) {
        return this.channelService.update(+id, updateChannelDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.channelService.remove(+id)
    }
}
