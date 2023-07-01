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
        const player1 = this.playerRepo.create({login: 'Boss', avatarUrl: 'http://localhost:8080/api/player/picture/profil-picture-placeholder.png'})
        await this.playerRepo.save(player1)
        const player2 = this.playerRepo.create({login: 'epresa-c', avatarUrl: 'http://localhost:8080/api/player/picture/epresa-c.jgp'})
        await this.playerRepo.save(player1)
        const player3 = this.playerRepo.create({login: 'mpons', avatarUrl: 'http://localhost:8080/api/player/picture/mpons.jpg'})
        await this.playerRepo.save(player1)
        const player4 = this.playerRepo.create({login: 'rburri', avatarUrl: 'http://localhost:8080/api/player/picture/rburri.jpg'})
        await this.playerRepo.save(player1)
        const player5 = this.playerRepo.create({login: 'sbars', avatarUrl: 'http://localhost:8080/api/player/picture/sbars.jpg'})
        await this.playerRepo.save(player1)
        const player6 = this.playerRepo.create({login: 'tgrivel', avatarUrl: 'http://localhost:8080/api/player/picture/tgrivel.jpg'})
        await this.playerRepo.save(player1)
    }
    getHello(): string {
        return 'Hello World!!!'
    }
}
