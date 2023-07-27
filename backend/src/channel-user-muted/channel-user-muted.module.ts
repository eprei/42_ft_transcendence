import { Module } from '@nestjs/common';
import { ChannelUserMutedService } from './channel-user-muted.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ChannelUserMutedService],
  exports: [ChannelUserMutedService],

})

export class ChannelUserMutedModule {}
