import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "./User.entity";

@Entity("video")
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({name: "is_private"})
  isPrivate: boolean;

  @ManyToOne(type => User, user => user.video)
  @JoinColumn({ name: 'owner_id' })
  owner: User;
}
