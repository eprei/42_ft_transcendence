import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    OneToMany,
} from 'typeorm'
import { Player } from './player.entity'
import { Message } from './message.entity'

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    owner: number

    @Column()
    name: string

    @Column()
    type: string

    @Column({
        nullable: true,
    })
    password: string

    @CreateDateColumn()
    creationDate: Date

    @ManyToMany(() => Player, (player) => player.channels)
    players: Player[]

    @OneToMany(() => Message, (message) => message.channel)
    messages: Message[]
}
