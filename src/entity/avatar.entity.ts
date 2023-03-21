import {Column, Entity, JoinColumn,  OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity } from "./index";

@Entity("video")
export class AvatarEntity {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    filename: string;

    @Column()
    url: string;

    @OneToOne(type => UserEntity, user => user.avatar)
    @JoinColumn({name: "ownerId"})
    owner: UserEntity;
}
