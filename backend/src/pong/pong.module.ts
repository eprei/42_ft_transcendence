import { Module, forwardRef } from '@nestjs/common'
import { PongGateway } from './pong.gateway'
import { PongService } from './pong.service'
import { Server } from 'socket.io'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [forwardRef(() => UserModule)],
    providers: [PongGateway, PongService, Server],
})
export class PongModule {}
