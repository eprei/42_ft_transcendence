import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    playerHome: number

    @Column({ type: 'int' })
    playerForeign: number

    @Column({ type: 'int' })
    winner: number

    @Column({ type: 'int' })
    homeScore: number

    @Column({ type: 'int' })
    foreignScore: number

    @Column()
    timestamp: Date
}
