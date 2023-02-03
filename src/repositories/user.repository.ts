import { Db } from "typeorm";
import { dbManager } from "..";
import { UserEntity } from "../entity/index";
import { IRegisterUserParameters, IGetUserByIdParameters } from "./interfaces";

class UserRepository {
    public async registerUser(parameters: IRegisterUserParameters){
        const user = await dbManager.create(UserEntity, parameters);
        
        await dbManager.save(user);
    } 

    public async getUserById({userId}: IGetUserByIdParameters){
        return dbManager.findOne(UserEntity, {where: {id: userId}})
    }
}

export const userRepository = new UserRepository()