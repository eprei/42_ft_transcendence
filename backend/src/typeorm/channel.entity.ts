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

    @ManyToOne(() => User, (user) => user.channels)
    @JoinColumn({ name: 'admin' })
    admin: User

    @ManyToMany(() => User, (user) => user.channels)
    users: User[]

    @OneToMany(() => Message, (message) => message.channelId)
    @JoinColumn({ name: 'messages' })
    messages: Message[]
}
