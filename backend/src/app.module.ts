import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { PlayerModule } from './player/player.module'
import { Player } from './typeorm/player.entity'
import { ChannelModule } from './channel/channel.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
            entities: [Player],
        }),
        PlayerModule,
        ChannelModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
