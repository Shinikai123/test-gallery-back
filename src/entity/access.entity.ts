import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import { UserEntity } from "./user.entity";
import { VideoEntity } from "./video.entity";

@Entity()
export class AccessEntity {
    @PrimaryColumn()
    user_id: string;

    @PrimaryColumn()
    video_id: string;

    @Column()
    access: string;

    @ManyToOne(type => UserEntity, user => user.accesses, {onDelete: "CASCADE"})
    @JoinColumn({name: 'user_id'})
    user : UserEntity;

    @ManyToOne(type => VideoEntity, video => video.accesses, {onDelete: 'CASCADE'})
    @JoinColumn({name: "video_id"})
    video: VideoEntity;
}