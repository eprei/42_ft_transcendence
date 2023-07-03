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

    @ManyToOne(() => Player, (player) => player.homeMatches)
    @JoinColumn({ name: 'playerHome' })
    playerHome: Player

    @ManyToOne(() => Player, (player) => player.foreignMatches)
    @JoinColumn({ name: 'playerForeign' })
    playerForeign: Player

    @ManyToOne(() => Player, (player) => player.wonMatches)
    @JoinColumn({ name: 'winner' })
    winner: Player

    @Column({ type: 'int' })
    homeScore: number

    @Column({ type: 'int' })
    foreignScore: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date
}
