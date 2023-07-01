import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Player {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'player_id',
    })
    id: number

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    login: string

    @Column()
    email: string

    @Column()
    avatarUrl: string

    @Column({ default: 0 })
    nbVictory: number

    @Column({ default: 0 })
    totalPlay: number

    @Column({ default: 0 })
    xp: number
}
