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
    })
    login: string

    @Column()
    avatarUrl: string

    @Column({ default: 0 })
    nbVictory: number

    @Column({ default: 0 })
    totalPlay: number

    @Column({ default: 0 })
    xp: number

    @ManyToMany(() => Channel, (channel) => channel.players)
    @JoinTable()
    channels: Channel[]
}
