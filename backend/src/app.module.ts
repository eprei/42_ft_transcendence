import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { PlayerModule } from './player/player.module'
import { ChannelModule } from './channel/channel.module'
import { Player } from './typeorm/player.entity'
import { Channel } from './typeorm/channel.entity'
import { MessageModule } from './message/message.module'
import { Message } from './typeorm/message.entity'
import { Friend } from './typeorm/friend.entity'
import { Match } from './typeorm/match.entity'
import { FriendModule } from './friend/friend.module'
import { MatchModule } from './match/match.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
            entities: [Player, Channel, Message, Friend, Match],
        }),
        TypeOrmModule.forFeature([Channel, Player, Message, Friend, Match]),
        PlayerModule,
        ChannelModule,
        MessageModule,
        FriendModule,
        MatchModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
