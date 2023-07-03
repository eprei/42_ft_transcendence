import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Player } from './player.entity'
@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Player, (player) => player.matchWon)
    @JoinColumn({ name: 'winner' })
    winner: Player

    @ManyToOne(() => Player, (player) => player.matchLost)
    @JoinColumn({ name: 'looser' })
    looser: Player

    @Column({ type: 'int' })
    scoreWinner: number

    @Column({ type: 'int' })
    scoreLooser: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateGame: Date
}
