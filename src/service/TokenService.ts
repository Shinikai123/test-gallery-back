import * as jwt from "jsonwebtoken";
import { User} from "../entity/User.entity";
import { dbManager } from "../../index";
import { Token } from "../entity/Token.entity";

export class TokenService {
    generateTokens(user : User) {
        const payload = {
            id: user.id,
            user_name : user.user_name,
            user_email : user.user_email
        };
        const accessToken = jwt.sign(payload, "1234-abcd-5678-efgh", {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, "1234-abcd-5678-efgh", {expiresIn: '21d'})
        return {
            accessToken,
            expires_in: '1800000',
            refreshToken
        }
    }

    async saveToken(user, token) {
        const {id} = user
        const TokenData = await dbManager.findOne(Token, {where : {user : {id}}})

        if(TokenData){
            await dbManager.update(Token, {user: {id}}, {token})
        } else {
            const newToken = dbManager.create(Token, {user, token});
            await dbManager.save(Token, newToken);
        }
    }

    validateAccessToken(token) {
        try{
            const userData = jwt.verify(token, process.env.JWT_SECRET || '');
            return userData;
        } catch(e) {
            return null;
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || '');
            return userData;
        } catch (e) {
            return null;
        }
    }

    async removeToken(token) {
        const TokenData = await dbManager.delete(Token, {token})
        return TokenData;
    }

    async findToken(token){
        const tokenData = await dbManager.findOne(Token, {where: {token}})
        return tokenData;
    }
}