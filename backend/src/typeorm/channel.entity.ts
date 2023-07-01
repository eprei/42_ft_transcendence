import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    owner: number

    @Column({
        unique: true,
        length: 20,
    })
    name: string

    @Column()
    type: string

    @Column({
        length: 30,
        nullable: true,
    })
    password: string

    @CreateDateColumn()
    creationDate: Date

}
