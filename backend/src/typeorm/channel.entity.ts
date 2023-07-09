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
import { User } from './user.entity'
import { Message } from './message.entity'

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (channel) => channel.owner)
    owner: User;

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

    @ManyToOne(() => User, (user) => user.owner)
    @JoinColumn({ name: 'admin' })
    admin: User

    @ManyToMany(() => User, (user) => user.joinedChannel)
    users: User[]

    @OneToMany(() => Message, (message) => message.channelId)
    @JoinColumn({ name: 'messages' })
    messages: Message[]
}
