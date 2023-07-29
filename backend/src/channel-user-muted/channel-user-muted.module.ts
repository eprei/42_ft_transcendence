import { Module } from '@nestjs/common'
import { ChannelUserMutedService } from './channel-user-muted.service'

@Module({
    providers: [ChannelUserMutedService],
    exports: [ChannelUserMutedService],
})
export class ChannelUserMutedModule {}
