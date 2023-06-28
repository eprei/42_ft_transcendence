import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Auth42Strategy } from './auth42.strategy'
import { AuthService } from './auth.service';


@Module({
  controllers: [AuthController],
  providers: [AuthService, Auth42Strategy]
})
export class AuthModule {}

