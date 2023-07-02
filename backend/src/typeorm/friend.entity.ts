import { Column, Entity, ManyToOne } from 'typeorm'
import { Player } from './player.entity'

@Entity()
export class Friend {
    // @Column({ type: 'int' })
    // player: number

    @Column({ type: 'int' })
    friend: number

    @Column()
    isPending: boolean

    @ManyToOne(() => Player, (player) => player.id)
    player: Player
}
