import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ChannelService } from './channel.service'
import { ChannelController } from './channel.controller'
import { Channel } from 'src/typeorm/channel.entity'
import { User } from 'src/typeorm/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Channel, User])],
    controllers: [ChannelController],
    providers: [ChannelService],
    exports: [ChannelService, TypeOrmModule],
})
export class ChannelModule {}
