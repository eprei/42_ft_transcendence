import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Player } from './typeorm/player.entity'
import { Repository } from 'typeorm'
import { Channel } from './typeorm/channel.entity'
import { Friend } from './typeorm/friend.entity'

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Player) private playerRepo: Repository<Player>,
        @InjectRepository(Channel) private channelRepo: Repository<Channel>,
        @InjectRepository(Friend) private friendRepo: Repository<Friend>
    ) {}

    async seed() {
        // Players
        const player1 = this.playerRepo.create({
            login: 'Boss',
            avatarUrl:
                'http://localhost:8080/api/player/picture/profil-picture-placeholder.png',
        })
        await this.playerRepo.save(player1)
        const player2 = this.playerRepo.create({
            login: 'epresa-c',
            avatarUrl: 'http://localhost:8080/api/player/picture/epresa-c.jgp',
        })
        await this.playerRepo.save(player2)
        const player3 = this.playerRepo.create({
            login: 'mpons',
            avatarUrl: 'http://localhost:8080/api/player/picture/mpons.jpg',
        })
        await this.playerRepo.save(player3)
        const player4 = this.playerRepo.create({
            login: 'rburri',
            avatarUrl: 'http://localhost:8080/api/player/picture/rburri.jpg',
        })
        await this.playerRepo.save(player4)
        const player5 = this.playerRepo.create({
            login: 'sbars',
            avatarUrl: 'http://localhost:8080/api/player/picture/sbars.jpg',
        })
        await this.playerRepo.save(player5)
        const player6 = this.playerRepo.create({
            login: 'tgrivel',
            avatarUrl: 'http://localhost:8080/api/player/picture/tgrivel.jpg',
        })
        await this.playerRepo.save(player6)

        // Channels
        const chan1 = this.channelRepo.create({
            owner: 1,
            name: 'chan 1',
            type: 'public',
            password: null,
        })
        chan1.players = [player1]
        await this.channelRepo.save(chan1)

        const chan2 = this.channelRepo.create({
            owner: 1,
            name: 'chan 2',
            type: 'public',
            password: null,
        })
        chan2.players = [player1, player4]
        await this.channelRepo.save(chan2)

        const chan3 = this.channelRepo.create({
            owner: 1,
            name: 'chan 3',
            type: 'private',
            password: '1234',
        })
        chan3.players = [player1, player3]
        await this.channelRepo.save(chan3)

        const chan4 = this.channelRepo.create({
            owner: 2,
            name: 'chan 4',
            type: 'private',
            password: '1234',
        })
        chan4.players = [player2]
        await this.channelRepo.save(chan4)

        const chan5 = this.channelRepo.create({
            owner: 2,
            name: 'chan 5',
            type: 'direct',
            password: null,
        })
        chan5.players = [player2, player5]
        await this.channelRepo.save(chan5)

        const chan6 = this.channelRepo.create({
            owner: 3,
            name: 'chan 6',
            type: 'direct',
            password: null,
        })
        chan6.players = [player3, player4]
        await this.channelRepo.save(chan6)

        // Create friendships
        const players = [player1, player2, player3, player4, player5, player6]

        for (const player of players) {
            const friends = players
                .filter((p) => p.id !== player.id)
                .slice(0, 3)

            for (const friend of friends) {
                const friendship = this.friendRepo.create({
                    player: player,
                    friend: friend,
                    isPending: false,
                })

                await this.friendRepo.save(friendship)
            }
        }
    }
    getHello(): string {
        return 'Hello World!!!'
    }
}
