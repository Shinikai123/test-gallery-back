import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { UserEntity } from './index';

@Entity()
export class TokenEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;

  @OneToOne(type => UserEntity, user => user.token)
  @JoinColumn({name:"user_id"})
  user: UserEntity;
}