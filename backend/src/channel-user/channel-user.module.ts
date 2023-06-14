import { Module } from '@nestjs/common'
import { ChannelUserService } from './channel-user.service'
import { ChannelUserController } from './channel-user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChannelUser } from 'src/typeorm/channel-user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([ChannelUser])],
    controllers: [ChannelUserController],
    providers: [ChannelUserService],
})
export class ChannelUserModule {}
