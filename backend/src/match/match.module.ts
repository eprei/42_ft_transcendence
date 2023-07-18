import { Module } from '@nestjs/common'
import { MatchService } from './match.service'
import { MatchController } from './match.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Match } from 'src/typeorm/match.entity'
import { UserService } from 'src/user/user.service'
import { UserModule } from 'src/user/user.module'

@Module({
    imports: [TypeOrmModule.forFeature([Match]), UserModule],
    controllers: [MatchController],
    providers: [MatchService, UserService],
    exports: [MatchService, TypeOrmModule],
})
export class MatchModule {}
