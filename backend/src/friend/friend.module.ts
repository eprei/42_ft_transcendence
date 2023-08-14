import { Module, forwardRef } from '@nestjs/common'
import { FriendService } from './friend.service'
import { FriendController } from './friend.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Friend } from 'src/typeorm/friend.entity'
import { UserModule } from 'src/user/user.module'
import { User } from 'src/typeorm/user.entity'
import { PongGateway } from 'src/pong/pong.gateway'

@Module({
    imports: [
        TypeOrmModule.forFeature([Friend, User]),
        forwardRef(() => UserModule),
    ],
    controllers: [FriendController],
    providers: [FriendService, PongGateway],
    exports: [FriendService],
})
export class FriendModule {}
