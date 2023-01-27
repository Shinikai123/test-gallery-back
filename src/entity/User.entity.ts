import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity ("users")
    export class User {
        static findByIdAndUpdate(id: any, user: any, arg2: { new: boolean; }) {
            throw new Error("Method not implemented.");
        }
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