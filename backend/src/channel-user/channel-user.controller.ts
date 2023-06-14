import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { ChannelUserService } from './channel-user.service'
import { CreateChannelUserDto } from './dto/create-channel-user.dto'
import { UpdateChannelUserDto } from './dto/update-channel-user.dto'

@Controller('channel-user')
export class ChannelUserController {
    constructor(private readonly channelUserService: ChannelUserService) {}

    @Post()
    create(@Body() createChannelUserDto: CreateChannelUserDto) {
        return this.channelUserService.create(createChannelUserDto)
    }

    @Get()
    findAll() {
        return this.channelUserService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.channelUserService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateChannelUserDto: UpdateChannelUserDto
    ) {
        return this.channelUserService.update(+id, updateChannelUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.channelUserService.remove(+id)
    }
}
