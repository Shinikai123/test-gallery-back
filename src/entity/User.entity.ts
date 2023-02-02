import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne } from "typeorm";
import {Video} from "./Video.entity";
import {Token} from "./Token.entity";

@Entity ("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "user_name"})
    user_name : string;

    @Column()
    user_email : string;

    @Column()
    password: string;

    @OneToMany(type => Video, video => video.owner)
    video: Video[];

    @OneToOne(type => Token, token => token.user)
    token: Token;

    @CreateDateColumn()
    signup_date : Date;
}