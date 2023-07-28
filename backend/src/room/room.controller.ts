import {
    Controller,
    Get,
    Post,
    Put,
    Req,
    Body,
    Param,
    Request,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { RoomService } from './room.service'
import { Room } from 'src/types/Room'
import { ApiTags } from '@nestjs/swagger'
import { CreateRoomDto } from './dto/create-room.dto'

@ApiTags('room')
@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    getAllRooms(): Room[] {
        return this.roomService.getAllRooms()
    }

    @Get(':id')
    getRoomById(@Param('id') id: number): Room {
        return this.roomService.getRoomById(id)
    }

    @Post()
    async createRoom(
        @Request() req: any,
        @Body() createRoomDto: CreateRoomDto
    ): Promise<Room> {
        try {
            const room = await this.roomService.createRoom(req, createRoomDto)
            return room
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }

    @Put(':id')
    updateRoom(@Param('id') id: number, @Body() updatedRoom: Room): Room {
        return this.roomService.updateRoom(id, updatedRoom)
    }

    @Post('joinroom/random')
    async joinRoom(@Req() req: any): Promise<Room> {
        try {
            const room = await this.roomService.joinRandomRoom(req)
            return room
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }
}
