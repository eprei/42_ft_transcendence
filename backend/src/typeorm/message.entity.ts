import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Channel } from './channel.entity'
import { User } from './user.entity'

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    creator: number

	@ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'creator', referencedColumnName: 'id' })
    creatorUser: User;

    @Column({ type: 'text' })
    content: string

    @ManyToOne(() => Channel, (channel) => channel.messages, { cascade: true })
    @JoinColumn({ name: 'channelId' })
    channelId: Channel

    @CreateDateColumn()
    creationDate: Date
}
