import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm'
import { Channel } from './channel.entity'

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    creator: number

    @Column()
    content: string

    @CreateDateColumn()
    creationDate: Date

    @ManyToOne(() => Channel, (channel) => channel.messages)
    channel: Channel
}
