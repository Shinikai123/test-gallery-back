import { User } from "../entity/User.entity";
import { dbManager } from "../../index";
import { TokenService } from "./TokenService";
import { comparePassword, hashPassword } from "../utils/bcrypt";

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
        const user = await dbManager.findOne(User, {where : {id}});
        const tokens = tokenService.generateTokens(user);
        await tokenService.saveToken(user, tokens.refreshToken);

        return {...tokens, ...user}
    }

    async registerUser(userName, userEmail, password) {
        const hashedPassword = await hashPassword(password);
        const user = dbManager.create(User, {userName, userEmail, password : hashedPassword});

        const {accessToken, refreshToken, expires_in} = tokenService.generateTokens(user);
        await tokenService.saveToken(user, refreshToken);

        return {...user, refreshToken, accessToken, expires_in}
    }

    async loginUser(userEmail, password){
        const user = await dbManager.findOne(User, {where: {userEmail}});
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
            userName: user.user_name,
            userEmail: user.user_email,
            ...tokens
        };
    }

    async logoutUser(refreshToken){
        return await tokenService.removeToken(refreshToken);
    }

    async getAllUsers() {
        return await dbManager.find(User);
    }

    async getUserById(id) {
        try {
            const user = await dbManager.findOne(User, {where : {id}});
            return user.user_name;
        } catch (e : any){
            return {error: e.message}
        }
    }
}
    