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

    @Column({ type: 'int' })
    creator: number

    @Column({ type: 'text' })
    content: string

    @CreateDateColumn()
    creationDate: Date

    @ManyToOne(() => Channel, (channel) => channel.messages)
    channel: Channel
}
