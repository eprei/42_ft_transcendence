import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { Player } from './player.entity'
import { Channel } from './channel.entity'

@Entity()
export class ChannelUser {
    // @ManyToMany((type) => Player, (player) => Player)
    // @JoinTable({
    // 	name: 'channel_user',
    // 	joinColumns: [{
    // 		name: 'channel_id',
    // 		referencedColumnName: 'id',
    // 	}],
    // 	inverseJoinColumns: [{
    // 		name: 'user_id',
    // 		referencedColumnName: 'id',
    // 	}],
    // })
    // users: Player;

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Player, (player) => Player)
    user: Player

    @ManyToOne(() => Channel, (channel) => Channel)
    channel: Channel

    @Column()
    isAdmin: boolean

    @Column()
    penality: boolean
}
