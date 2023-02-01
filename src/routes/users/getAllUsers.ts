import {Router} from "express";
import {UserController}from "../../controller/UserController";
import { authMiddleware } from "../../middleware/auth-middleware";

const router = Router();
const userController = new UserController()

router.get('/users', authMiddleware, userController.getAllUsers);

export {router as getAllUsers}