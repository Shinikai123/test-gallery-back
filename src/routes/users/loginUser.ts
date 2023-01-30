import {Router} from "express";
import {UserController}from "../../controller/UserController";

const router = Router();
const userController = new UserController()

router.post('/login', userController.loginUser);

export {router as loginUser}