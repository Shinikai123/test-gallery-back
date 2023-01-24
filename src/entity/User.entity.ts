import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity ("users")
    export class User {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column({name: "nick_name"})
        nickName : string;

        @Column()
        email: string

        @Column()
        password: string;
    }