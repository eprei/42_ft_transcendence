import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Player } from './typeorm/player.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Player) private playerRepo: Repository<Player>
    ) {}

    async seed() {
        const player1 = this.playerRepo.create()
        await this.playerRepo.save(player1)
    }
    getHello(): string {
        return 'Hello World!!!'
    }
}
