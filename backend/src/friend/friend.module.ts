import { Module } from '@nestjs/common'
import { FriendService } from './friend.service'
import { FriendController } from './friend.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Friend } from 'src/typeorm/friend.entity'
import { UserModule } from 'src/user/user.module'
import { User } from 'src/typeorm/user.entity'
import { UserService } from 'src/user/user.service'

@Module({
    imports: [TypeOrmModule.forFeature([Friend, User]), UserModule],
    controllers: [FriendController],
    providers: [FriendService, UserService],
})
export class FriendModule {}
