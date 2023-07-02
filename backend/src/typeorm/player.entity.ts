import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm'
import { Channel } from './channel.entity'
import { Friend } from './friend.entity'
import { Match } from './match.entity'

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        type: 'text',
    })
    login: string

    @Column('text')
    avatarUrl: string

    @Column({ type: 'int', default: 0 })
    nbVictory: number

    @Column({ type: 'int', default: 0 })
    totalPlay: number

    @Column({ type: 'int', default: 0 })
    xp: number

    @Column({ default: '' })
    TFASecret: string

    @Column({ default: false })
    TFAEnabled: boolean

    @Column()
    FT_id: string

    @ManyToMany(() => Channel, (channel) => channel.players)
    @JoinTable()
    channels: Channel[]

    @OneToMany(() => Friend, (friend) => friend.player)
    friends: Friend[]

    @ManyToMany(() => Player, (player) => player.blockedPlayers)
    @JoinTable()
    blockedPlayers: Player[]

    @OneToMany(() => Match, (match) => match.playerHome)
    homeMatches: Match[]

    @OneToMany(() => Match, (match) => match.playerForeign)
    foreignMatches: Match[]

    @OneToMany(() => Match, (match) => match.winner)
    wonMatches: Match[]
}
