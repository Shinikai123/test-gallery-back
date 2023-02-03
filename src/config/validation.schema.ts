/* eslint-disable no-undef */
import {Request, Response } from "express";
import { EnvSchema } from "./schema.env";
import * as dotenv from 'dotenv';
dotenv.config();

export class ValidationSchema {
    async ComparePort (req: Request, res: Response) {
        try{
            if(EnvSchema.PORT === process.env.PORT){
                return res.send({message: 'successed port comparing'})
            }
        } catch (error) {
            return res.send({error: 'port comparing error'})
        }
    };

    async CompareDBUser (req: Request, res: Response) {
        try{
            if(EnvSchema.DB_USER === process.env.DB_USER){
                return res.send({message: 'successed user comparing'})
            }
        } catch (error) {
            return res.send({error: 'user comparing error'})
        };
    };

    async CompareDBHost (req: Request, res: Response) {
        try{
            if(EnvSchema.DB_HOST === process.env.DB_HOST){
                return res.send({message: 'successed database user comparing'})
            }
        } catch (error) {
            return res.send({error: 'database user comparing error'})
        };
    }

    async CompareDBName (req: Request, res: Response) {
        try{
            if(EnvSchema.DB_NAME === process.env.DB_NAME){
                return res.send({message: 'successed database name comparing'})
            }
        } catch (error) {
            return res.send({error: 'database name comparing error'})
        };
    }

    async CompareDBPassword (req: Request, res: Response) {
        try{
            if(EnvSchema.DB_PASSWORD === process.env.DB_PASSWORD){
                return res.send({message: 'successed database password comparing'})
            }
        } catch (error) {
            return res.send({error: 'database password comparing error'})
        };
    }

    async CompareDBPort (req: Request, res: Response) {
        try{
            if(EnvSchema.DB_PORT === process.env.DB_PORT){
                return res.send({message: 'successed database port comparing'})
            }
        } catch (error) {
            return res.send({error: 'database port comparing error'})
        };
    }

    async CompareDBType (req: Request, res: Response) {
        try{
            if(EnvSchema.DB_TYPE === process.env.DB_TYPE){
                return res.send({message: 'successed database type comparing'})
            }
        } catch (error) {
            return res.send({error: 'database type comparing error'})
        };
    }

    async CompareDBSchema (req: Request, res: Response) {
        try{
            if(EnvSchema.DB_SCHEMA === process.env.DB_SCHEMA){
                return res.send({message: 'successed databse schema comparing'})
            }
        } catch (error) {
            return res.send({error: 'database schema comparing error'})
        };
    }

    async CompareJWTSecret (req: Request, res: Response) {
        try{
            if(EnvSchema.JWT_SECRET === process.env.JWT_SECRET){
                return res.send({message: 'successed jwt secret key comparing'})
            }
        } catch (error) {
            return res.send({error: 'jwt secret key comparing error'})
        };
    }

    async CompareRefreshToken(req: Request, res: Response) {
        try{
            if(EnvSchema.REFRESH_TOKEN === process.env.REFRESH_TOKEN){
                return res.send({message: 'successed refresh token comparing'})
            }
        } catch (error) {
            return res.send({error: 'refresh token comparing error'})
        };
    }

    async CompareStoragePath (req: Request, res: Response) {
        try{
            if(EnvSchema.STORAGE_PATH === process.env.STORAGE_PATH){
                return res.send({message: 'successed storage path comparing'})
            }
        } catch (error) {
            return res.send({error: 'storage path comparing error'})
        };
    }
}