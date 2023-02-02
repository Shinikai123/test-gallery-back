import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;

  @OneToOne(type => User, user => user.token)
  @JoinColumn({name:"userId"})
  user: User;
}