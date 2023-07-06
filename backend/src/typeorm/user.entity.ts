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
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        type: 'text',
    })
    first_name: string

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

    @Column({ default: '' })
    FT_id: string

    @ManyToMany(() => Channel, (channel) => channel.users)
    @JoinTable()
    channels: Channel[]

    @OneToMany(() => Friend, (friend) => friend.user)
    friends: Friend[]

    @OneToMany(() => Friend, (friend) => friend.friend)
    friendOf: Friend[]

    @OneToMany(() => Match, (match) => match.looser)
    matchLost: Match[]

    @OneToMany(() => Match, (match) => match.winner)
    matchWon: Match[]
}
