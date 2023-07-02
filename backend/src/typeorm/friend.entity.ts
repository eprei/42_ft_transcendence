import { Column, Entity } from 'typeorm'

@Entity()
export class Friend {
    @Column({ type: 'int' })
    player: number

    @Column({ type: 'int' })
    friend: number

    @Column()
    isPending: boolean
}
