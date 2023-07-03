import { Module } from '@nestjs/common'
import { FriendService } from './friend.service'
import { FriendController } from './friend.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Friend } from 'src/typeorm/friend.entity'
import { PlayerModule } from 'src/player/player.module'
import { Player } from 'src/typeorm/player.entity'
import { PlayerService } from 'src/player/player.service'

@Module({
    imports: [TypeOrmModule.forFeature([Friend, Player]), PlayerModule],
    controllers: [FriendController],
    providers: [FriendService, PlayerService],
})
export class FriendModule {}
