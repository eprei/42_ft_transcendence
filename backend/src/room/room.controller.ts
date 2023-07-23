import { Controller, Get, Post, Put, Req, Body, Param } from '@nestjs/common'
import { RoomService } from './room.service'
import { Room } from 'src/types/Room'
import { Public } from '../decorators/public.decorator'
import { ApiTags } from '@nestjs/swagger'
import { CreateRoomDto } from './dto/create-room.dto'

@Public()
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
    createRoom(@Body() room: CreateRoomDto): Room {
        return this.roomService.createRoom(room)
    }

    @Put(':id')
    updateRoom(@Param('id') id: number, @Body() updatedRoom: Room): Room {
        return this.roomService.updateRoom(id, updatedRoom)
    }

    @Post('joinroom/random')
    joinRoom(@Req() req: any): Promise<Room> {
        return this.roomService.joinRandomRoom(req)
    }
}
