import { UserEntity } from "../entity/index";
import { dbManager } from "../index";
import { TokenService } from "./token.service";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { TokenEntity } from "../entity/index";
import fs from "fs";

const tokenService = new TokenService()

export class UserService{
    async refreshToken(refreshToken){
        if (!refreshToken) {
            throw new Error('auth error (!refreshToken)');
        }

        const userData : any = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDB) {
            throw new Error('auth error (!userData || !tokenFromDB)')
        }

        const {id} = userData
        const user = await dbManager.findOne(UserEntity, {where : {id}});
        const tokens = tokenService.generateTokens(user);
        await tokenService.saveToken(user, tokens.refreshToken);

        return {...tokens, ...user}
    }

    async registerUser(userName, userEmail, password, ) {
        const hashedPassword = await hashPassword(password);

        const user = dbManager.create(UserEntity, {userName, userEmail, password : hashedPassword, avatar: ""});
        await dbManager.save(user); 

        const {accessToken, refreshToken, expires_in} = tokenService.generateTokens(user);
        await tokenService.saveToken(user, refreshToken);

        try{
            const { userId } = await dbManager.save(UserEntity, user);
            if(!fs.existsSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${userId}`)) {
                fs.mkdirSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${userId}`)
            }
        } catch (e){
            console.log(e);
        }
        
        return {...user, refreshToken, accessToken, expires_in}
    }

    async loginUser(user_email, password){
        const user = await dbManager.findOne(UserEntity, {where: {user_email}});
        if(!user){
            return{error : 'User not found'}
        }
        const isValid = await comparePassword(password, user.password);
        if (!isValid) {
            return {error: 'check out your password'};
        }
        const tokens = tokenService.generateTokens(user);

        await tokenService.saveToken(user, tokens.refreshToken);
        return {
            id: user.id,
            user_name: user.user_name,
            user_email: user.user_email,
            avatar: user.avatar,
            ...tokens
        };
    }

    async logoutUser(refreshToken){
        return await tokenService.removeToken(refreshToken);
    }

    async getAllUsers() {
        return await dbManager.find(UserEntity);
    }

    async getUserById(id: string) {
        try {
            const user = await dbManager.findOne(UserEntity, {where : {id}});
            return user.user_name;
        } catch (e){
            console.log(e);
            throw e;
        }    
    }


    async saveAvatar(userId, url){
        console.log("saveAvatarService")
        if(!fs.existsSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${userId}/${process.env.AVATAR_PATH}`))
        {
            fs.mkdirSync(`${process.cwd()}/${process.env.STORAGE_PATH}/${userId}/${process.env.AVATAR_PATH}`); 
        }
        
        const user = await dbManager.find(UserEntity, {where: {id: userId}});
        user.avatar = `${process.env.DOMAIN}/users/avatar/${userId}`;
        const savedAvatar = await dbManager.save(UserEntity, user);

        return savedAvatar;
    }

    // async getAvatarById(id) {
    //     try{
    //         const user = await dbManager.findOne(UserEntity, {where: {id}});
    //         return user.avatar;
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    // async deleteAvatar(avatar) {
    //     return dbManager.delete(UserEntity, {avatar})
    // }
    
    // async updateAvatar(id, avatar) {
    //     try{
    //         return await dbManager.delete(UserEntity, { avatar});
    //     } catch(e) {
    //         console.log(e)
    //     } finally {
    //          await dbManager.update(UserEntity, { avatar});
    //     }
    // }
    

}
    