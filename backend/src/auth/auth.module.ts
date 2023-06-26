import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { Auth42Strategy } from './auth42.strategy'
import { SessionSerializer } from './session.serializer'

@Module({
    imports: [PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [Auth42Strategy, SessionSerializer],
})
export class AuthModule {}
