import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Player } from './player.entity'

@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    friend: number

    @Column()
    isPending: boolean

    @ManyToOne(() => Player, (player) => player.id)
    player: Player
}
