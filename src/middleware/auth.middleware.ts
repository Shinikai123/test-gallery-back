import { NextFunction, Response } from "express";
import { TokenService } from "../service/token.service";

const tokenService = new TokenService();

export const authMiddleware = (req, res: Response, next : NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(401).json('non-authorized')
        }
        const accessToken = authHeader.split('')[1];
        if(!accessToken) {
            return res.status(401).json('non-authorized')
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return res.status(401).json('non-authorized')
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(new Error('non-authorized'))
    }
}