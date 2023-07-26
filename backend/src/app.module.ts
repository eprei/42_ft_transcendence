import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { ChannelModule } from './channel/channel.module'
import { User } from './typeorm/user.entity'
import { Channel } from './typeorm/channel.entity'
import { MessageModule } from './message/message.module'
import { Message } from './typeorm/message.entity'
import { Friend } from './typeorm/friend.entity'
import { Match } from './typeorm/match.entity'
import { FriendModule } from './friend/friend.module'
import { MatchModule } from './match/match.module'
import { AuthModule } from './auth/auth.module'
import { PongModule } from './pong/pong.module'
import { AuthenticatedGuard } from './auth/guards/authenticated.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
            entities: [User, Channel, Message, Friend, Match],
        }),
        TypeOrmModule.forFeature([Channel, User, Message, Friend, Match]),
        UserModule,
        ChannelModule,
        MessageModule,
        FriendModule,
        MatchModule,
        AuthModule,
        PongModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthenticatedGuard,
        },
    ],
})
export class AppModule {}
