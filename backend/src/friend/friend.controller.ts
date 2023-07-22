import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
} from '@nestjs/common'
import { FriendService } from './friend.service'
import { UpdateFriendDto } from './dto/update-friend.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('friend')
@Controller('friend')
export class FriendController {
    constructor(private readonly friendService: FriendService) {}

    @Post('create/:id')
    async create(@Request() req: any, @Param('id') id: string) {
        const friend = await this.friendService.create(req, +id)
        return { 'Friendship request successfully submitted': 'true' }
    }

    @Get()
    async findAll() {
        const friends = await this.friendService.findAll()
        return friends
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const friend = await this.friendService.findOne(+id)
        return friend
    }

    @Patch('accept/:id')
    async accept(
        @Param('id') id: string,
        @Body() updateFriendDto: UpdateFriendDto
    ) {
        const friend = await this.friendService.accept(+id, updateFriendDto)
        return { 'Friendship successfully accepted': 'true' }
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        const friend = await this.friendService.remove(+id)
        return { 'Friendship successfully removed': 'true' }
    }
}
