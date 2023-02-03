import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne } from "typeorm";
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

    @OneToMany(type => VideoEntity, video => video.owner)
    video: VideoEntity[];

    @OneToOne(type => TokenEntity, token => token.user)
    token: TokenEntity;

    @CreateDateColumn()
    signup_date : Date;
}