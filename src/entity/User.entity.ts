import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne } from "typeorm";
import { AccessEntity } from "./access.entity";
import {VideoEntity} from "./index";
import {TokenEntity} from "./index";


@Entity ("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "user_name"})
    user_name : string;

    @Column()
    user_email : string;

    @Column()
    password: string;

    @OneToMany(type => VideoEntity, video => video.owner, {onDelete: "CASCADE"})
    video: VideoEntity[];

    @OneToOne(type => TokenEntity, token => token.user, {onDelete: "CASCADE"})
    token: TokenEntity;

    @OneToMany(type => AccessEntity, access => access.video, {onUpdate: "CASCADE"})
    accesses: AccessEntity[];

    @CreateDateColumn()
    signup_date : Date;
}