import {Router} from "express";
import {UserController}from "../controller/user.controller";
import { getTokens } from "./token/route.token.get-tokens";

const router = Router();
const userController = new UserController()

router.post('/register', userController.registerUser),
router.post('/login', userController.loginUser),
router.get('/logout', userController.logoutUser),
router.get('/users', userController.getAllUsers),
router.get('/users/:id', userController.getUser),
router.get('/refresh', userController.refresh),
router.get('/tokens', getTokens)
    
export default router;