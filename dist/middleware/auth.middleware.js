"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const token_service_1 = require("../service/token.service");
const tokenService = new token_service_1.TokenService();
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json('non-authorized');
        }
        const accessToken = authHeader.split('')[1];
        if (!accessToken) {
            return res.status(401).json('non-authorized');
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return res.status(401).json('non-authorized');
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(new Error('non-authorized'));
    }
};
exports.authMiddleware = authMiddleware;
