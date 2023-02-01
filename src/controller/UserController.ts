import { dbManager } from "../..";
import {NextFunction, Request, Response} from "express";
import { User } from "../entity/User.entity";
import {TokenService} from "../service/TokenService";
import{UserService} from "../service/UserService";

const tokenService = new TokenService();
const userService = new UserService();

export class UserController {
 async registerUser(req : Request, res: Response, next: NextFunction) {
    
    try{
        
        const {userName, userEmail, password} = req.body;
        const compareUser = await dbManager.findOne(User, {where: {userEmail}});

        if(compareUser) {
            return res.status(409).send({error: 'User with this email already exists'});
        }
        const userData = await userService.registerUser(userName, userEmail, password)

        res.cookie('refreshToken', userData.refreshToken, {maxAge: 24 * 60 * 60 *1000, httpOnly: true})
        return res.status(201).send({
            ...userData
        });
    } catch (e) {
        next(e);
    }
 }

 async loginUser(req, res, next) {
    try {
        const {userEmail, password} = req.body;
        const userData = await userService.loginUser(userEmail, password);

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
        if(userData.err) {
            return res.json({err: "User not found"})
        }
        return res.json({id, userEmail: userData})
    } catch (e) {
        next(e)
    }
 }
}
