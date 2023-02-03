import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity } from "./index";

@Entity("video")
export class VideoEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({name: "is_private"})
  isPrivate: boolean;

  @ManyToOne(type => UserEntity, user => user.video)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;
}
