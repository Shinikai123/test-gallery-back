import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity ("users")
    export class User {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column()
        user_name : string;

        @Column()
        user_email : string;

        @Column()
        password: string;

        @CreateDateColumn()
        signup_date : Date;
    }