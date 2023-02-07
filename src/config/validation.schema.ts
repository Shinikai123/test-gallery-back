/* eslint-disable no-undef */
import { EnvSchema} from "./schema.env";
import * as dotenv from 'dotenv';
import { plainToInstance } from "class-transformer";
dotenv.config();

import {validateSync} from 'class-validator'

export const validation = (config: Record<string, any>)=>{
    const validationConfig = plainToInstance(EnvSchema, config, {enableImplicitConversion: true, strategy: 'excludeAll'})

    const errors = validateSync(validationConfig, {skipMissingProperties: false})

    if(errors.length){
        throw new Error(errors.toString())
    }

    return validationConfig;
}