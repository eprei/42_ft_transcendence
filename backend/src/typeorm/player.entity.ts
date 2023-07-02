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

    @ManyToMany(() => Channel, (channel) => channel.players)
    @JoinTable()
    channels: Channel[]

    @OneToMany(() => Friend, (friend) => friend.player)
    friends: Friend[]

    @ManyToMany(() => Player, (player) => player.blockedPlayers)
    @JoinTable()
    blockedPlayers: Player[]
}
