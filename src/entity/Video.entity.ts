import { access } from 'fs';
import { type } from 'os';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { AccessEntity } from './access.entity';
import {UserEntity } from "./index";

@Entity("video")
export class VideoEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  filename: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @ManyToOne(type => UserEntity, user => user.video)
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;

  @OneToMany(type => AccessEntity, access => access.user)
  accesses: AccessEntity[];
}
