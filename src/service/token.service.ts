import * as jwt from "jsonwebtoken";
import { UserEntity} from "../entity/index";
import { dbManager } from "../index";
import { TokenEntity } from "../entity/index";

export class TokenService {
    generateTokens(user : UserEntity) {
        const payload = {
            id: user.id,
            user_name : user.user_name,
            user_email : user.user_email,
            avatar: `${process.env.DOMAIN}/users/avatar/`,
        };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "", {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "", {expiresIn: '21d'})
        return {
            accessToken,
            expires_in: '1800000',
            refreshToken
        }
    }

    async saveToken(user, token) {
        const {id} = user;
        const TokenData = await dbManager.findOne(TokenEntity, {where : {user : {id}}})

        if(TokenData){
            await dbManager.update(TokenEntity, {user: {id}}, {token})
        } else {
            const newToken = dbManager.create(TokenEntity, {user, token});
            await dbManager.save(TokenEntity, newToken);
        }
    }

    validateAccessToken(token) {
        try{
            // eslint-disable-next-line no-undef
            const userData = jwt.verify(token, process.env.JWT_SECRET || '');
            return userData;
        } catch(e) {
            return null;
        }
    }

    validateRefreshToken(token){
        try{
            // eslint-disable-next-line no-undef
            const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || '');
            return userData;
        } catch (e) {
            return null;
        }
    }

    async removeToken(token) {
        const TokenData = await dbManager.delete(TokenEntity, {token})
        return TokenData;
    }

    async findToken(token){
        const tokenData = await dbManager.findOne(TokenEntity, {where: {token}})
        return tokenData;
    }
}