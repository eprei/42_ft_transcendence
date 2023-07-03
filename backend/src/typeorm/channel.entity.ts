import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Player } from './player.entity'
import { Message } from './message.entity'

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    owner: number

    @Column({ type: 'varchar', length: 500 })
    name: string

    @Column()
    type: string

    @Column({
        nullable: true,
    })
    password: string

    @CreateDateColumn()
    creationDate: Date

    @ManyToOne(() => Player, (player) => player.channels)
    @JoinColumn({ name: 'admin' })
    admin: Player

    @ManyToMany(() => Player, (player) => player.channels)
    players: Player[]

    @OneToMany(() => Message, (message) => message.channelId)
    @JoinColumn({ name: 'messages' })
    messages: Message[]
}
