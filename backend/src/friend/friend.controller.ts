import {
    Inject,
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    BadRequestException,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common'
import { FriendService } from './friend.service'
import { UpdateFriendDto } from './dto/update-friend.dto'
import { ApiTags } from '@nestjs/swagger'
import { PongGateway } from 'src/pong/pong.gateway'

@ApiTags('friend')
@Controller('friend')
export class FriendController {
    constructor(
        private readonly friendService: FriendService,
        @Inject(PongGateway) private readonly pongGateway: PongGateway
    ) {}

    @Post('create/:id')
    async create(@Request() req: any, @Param('id') id: string) {
        try {
            await this.friendService.create(req, +id)
            this.pongGateway.sendReloadMsg()
            return { 'Friendship request successfully submitted': 'true' }
        } catch (error) {
            throw new BadRequestException()
        }
    }

    @Patch('accept/:id')
    @UsePipes(ValidationPipe)
    async accept(
        @Param('id') id: string,
        @Body() updateFriendDto: UpdateFriendDto
    ) {
        try {
            await this.friendService.accept(+id, updateFriendDto)
            this.pongGateway.sendReloadMsg()
            return { 'Friendship successfully accepted': 'true' }
        } catch (error) {
            throw new BadRequestException()
        }
    }

    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        try {
            await this.friendService.remove(+id)
            this.pongGateway.sendReloadMsg()
            return { 'Friendship successfully removed': 'true' }
        } catch (error) {
            throw new BadRequestException()
        }
    }
}
