import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { User } from './user.entity'
@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.matchWon)
    @JoinColumn({ name: 'winner' })
    winner: User

    @ManyToOne(() => User, (user) => user.matchLost)
    @JoinColumn({ name: 'looser' })
    looser: User

    @Column({ type: 'int' })
    scoreWinner: number

    @Column({ type: 'int' })
    scoreLooser: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateGame: Date
}
