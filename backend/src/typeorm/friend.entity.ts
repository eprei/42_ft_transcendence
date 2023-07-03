import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Player } from './player.entity'

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.friends)
  player: Player;

  @ManyToOne(() => Player, (player) => player.friendOf)
  friend: Player;

  @Column()
  isPending: boolean;
}
