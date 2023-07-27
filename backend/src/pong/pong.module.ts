import { Module } from '@nestjs/common'
import { PongGateway } from './pong.gateway'
import { PongService } from './pong.service'
import { Server } from 'socket.io'

@Module({
  providers: [PongGateway, PongService, Server],
})
export class PongModule {}
