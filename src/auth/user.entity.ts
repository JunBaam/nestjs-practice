import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username']) //NOTE: DB에 유니크값을 설정
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  //NOTE: eager:true 보드를 가져올때 유저도 가져온다
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
