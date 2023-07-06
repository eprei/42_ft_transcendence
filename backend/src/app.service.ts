import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './typeorm/user.entity'
import { Repository } from 'typeorm'
import { Channel } from './typeorm/channel.entity'
import { Friend } from './typeorm/friend.entity'
import { Message } from './typeorm/message.entity'
import { Match } from './typeorm/match.entity'

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Channel) private channelRepo: Repository<Channel>,
        @InjectRepository(Friend) private friendRepo: Repository<Friend>,
        @InjectRepository(Message) private messageRepo: Repository<Message>,
        @InjectRepository(Match) private matchRepo: Repository<Match>
    ) {}

    async seed() {
        //  create Users
        const user1 = this.userRepo.create({
            login: 'user1',
            avatarUrl: 'http://localhost:8080/api/user/picture/user1.webp',
        })
        await this.userRepo.save(user1)
        const user2 = this.userRepo.create({
            login: 'user2',
            avatarUrl: 'http://localhost:8080/api/user/picture/user2.webp',
        })
        await this.userRepo.save(user2)
        const user3 = this.userRepo.create({
            login: 'user3',
            avatarUrl: 'http://localhost:8080/api/user/picture/user3.webp',
        })
        await this.userRepo.save(user3)
        const user4 = this.userRepo.create({
            login: 'user4',
            avatarUrl: 'http://localhost:8080/api/user/picture/user4.webp',
        })
        await this.userRepo.save(user4)
        const user5 = this.userRepo.create({
            login: 'user5',
            avatarUrl: 'http://localhost:8080/api/user/picture/user5.webp',
        })
        await this.userRepo.save(user5)
        const user6 = this.userRepo.create({
            login: 'user6',
            avatarUrl: 'http://localhost:8080/api/user/picture/user6.webp',
        })
        await this.userRepo.save(user6)

        //   create Channels
        const chan1 = this.channelRepo.create({
            owner: 1,
            name: 'chan 1',
            type: 'public',
            password: null,
            admin: user1,
            users: [user1, user2, user5],
        })
        await this.channelRepo.save(chan1)

        const chan2 = this.channelRepo.create({
            owner: 1,
            name: 'chan 2',
            type: 'public',
            password: null,
            admin: user1,
            users: [user1, user4],
        })
        await this.channelRepo.save(chan2)

        const chan3 = this.channelRepo.create({
            owner: 1,
            name: 'chan 3',
            type: 'private',
            password: '1234',
            admin: user1,
            users: [user1, user3],
        })
        await this.channelRepo.save(chan3)

        const chan4 = this.channelRepo.create({
            owner: 2,
            name: 'chan 4',
            type: 'private',
            password: '1234',
            admin: user2,
            users: [user2, user4],
        })
        await this.channelRepo.save(chan4)

        const chan5 = this.channelRepo.create({
            owner: 2,
            name: 'chan 5',
            type: 'direct',
            password: null,
            admin: user2,
            users: [user2, user5],
        })
        await this.channelRepo.save(chan5)

        const chan6 = this.channelRepo.create({
            owner: 3,
            name: 'chan 6',
            type: 'direct',
            password: null,
            admin: user3,
        })
        chan6.users = [user3, user4]
        await this.channelRepo.save(chan6)

        // Create friendships
        const users = [user1, user2, user3, user4, user5, user6]

        for (const user of users) {
            const friends = users.filter((p) => p.id !== user.id).slice(0, 3)

            for (const friend of friends) {
                const friendship = this.friendRepo.create({
                    user: user,
                    friend: friend,
                    isPending: false,
                })

                await this.friendRepo.save(friendship)
            }
        }

        // Create messages
        const channels = await this.channelRepo.find()
        for (const channel of channels) {
            let userCount = 3
            if (channel.type === 'direct') {
                userCount = 2
            }

            const users = await this.userRepo.find({ take: userCount })
            const channelUsers = users
                .filter((user) => user.id !== channel.owner)
                .filter((user) => user !== undefined)
            if (channelUsers.length >= userCount) {
                channelUsers.pop()
            }

            const allUsers = await this.userRepo.find()
            const owner = allUsers.find((user) => user.id === channel.owner)
            channelUsers.unshift(owner)

            for (let i = 0; i < 10; i++) {
                const creator = channelUsers[i % userCount].id
                const content = `Message ${i + 1}`

                const message = this.messageRepo.create({
                    creator,
                    content,
                    creationDate: new Date(),
                    channelId: channel,
                })

                await this.messageRepo.save(message)
            }
        }

        const allusers = await this.userRepo.find()

        for (let i = 0; i < 10; i++) {
            const userA = allusers[Math.floor(Math.random() * allusers.length)]
            const userB = allusers[Math.floor(Math.random() * allusers.length)]
            const isUserAWinner = Math.random() >= 0.5 // 50% chance for userA to win

            const winner = isUserAWinner ? userA : userB
            const looser = isUserAWinner ? userB : userA
            const scoreWinner = Math.floor(Math.random() * 6)
            const scoreLooser = Math.floor(Math.random() * 6)
            const dateGame = new Date()

            const match = this.matchRepo.create({
                winner,
                looser,
                scoreWinner,
                scoreLooser,
                dateGame,
            })

            await this.matchRepo.save(match)
        }
    }
}
