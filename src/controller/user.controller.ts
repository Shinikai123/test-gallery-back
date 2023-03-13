import { dbManager } from "..";
import {NextFunction, Request, Response} from "express";
import { UserEntity } from "../entity/index";
// import {TokenService} from "../service/token.service";
import{UserService} from "../service/user.service";
import fs from "fs";
// import { userRepository } from "../repositories";

// const tokenService = new TokenService();
const userService = new UserService();

export class UserController {
 async registerUser(req : Request, res: Response, next: NextFunction) {
    try{
        const {user_name, user_email, password,} = req.body;
        const compareUser = await dbManager.findOne(UserEntity, {where: {user_email}});

        if(compareUser) {
            return res.send({error: 'User with this email already exists'});
        }
        const userData = await userService.registerUser(user_name, user_email, password)

        res.cookie('refreshToken', userData.refreshToken, 
            {maxAge: 24 * 60 * 60 *1000,
            httpOnly: true});
        return res.status(201).send({
            ...userData
        });
    } catch (e) {
        next(e);
    }
 }

 async loginUser(req, res, next) {
    try {
        const {user_email, password} = req.body;
        const userData = await userService.loginUser(user_email, password);
        // @ts-ignore
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData);
    } catch (e) {
        next(e);
    }
 }

 async logoutUser( req : Request, res: Response, next: NextFunction) {
    try{
        const {refreshToken} = req.cookies. refreshToken;
        const token = await userService.logoutUser(refreshToken);
        res.clearCookie('refreshToken');
        return res.status(200).json(token);
    } catch (e) {
        next()
    }
 }

 async refresh(req: Request, res: Response, next: NextFunction) {
    try{
        const refreshToken = req.cookies. refreshToken;
        const userData = await userService.refreshToken(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData);
    } catch (e) {
        next(e);
    }
 }

 async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try{
        const users = await userService.getAllUsers()
        return res.json(users)
    } catch (e) {
        next(e);
    }
 }

 async getUser(req : Request, res : Response, next : NextFunction) {
    const {id} = req.params;
    try{
        const userData = await userService.getUserById(id)
        if(userData.error) {
            return res.json({error: "User not found"})
        }
        return res.json({id, user_name: userData})
    } catch (e) {
        next(e)
    }
 }

async uploadAvatar(req: Request, res:Response, next: NextFunction) {
    const {userId} = req.params;
    if(!userId){
        res.sendStatus(401).json({error: ` ${userId}`});
    } else {
        try{
            const filename = req.file?.filename;
            const url = `${process.cwd()}/${process.env.STORAGE_PATH}/${userId}/${process.env.AVATAR_PATH}/${filename}`;
            const savedAvatar = await userService.saveAvatar(userId, url);
            console.log(savedAvatar);
            
            res.json(savedAvatar);
        } catch(e) {
            next(e);
            res.sendStatus(401);
        }
    }
}

async getAvatar(req: Request, res: Response, next: NextFunction) {
    console.log("getAvatarController")
    const { userId } = req.params;
    const ext = 'png' || 'jpg' || 'jpeg' ; 
    const avatarPath =  `${process.env.STORAGE_PATH}/${userId}/${process.env.AVATAR_PATH}/avatar.${ext}`;
    const defaultAvatar =  `${process.env.STORAGE_PATH}/defaultAvatar.png`;
    try{
        if(fs.existsSync(avatarPath)){
            const readStream = await fs.createReadStream(avatarPath);
            readStream.pipe(res)
        } 
        else {
            const readStream = await fs.createReadStream(defaultAvatar);
            readStream.pipe(res)
        }
    } catch(e) {
        console.log(e)
    }
} 

}
