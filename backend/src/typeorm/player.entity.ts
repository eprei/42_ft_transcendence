import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import { Channel } from './channel.entity'

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

    @ManyToMany(() => Channel, (channel) => channel.players)
    @JoinTable()
    channels: Channel[]
}
