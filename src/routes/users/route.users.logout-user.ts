import {Router} from "express";
import {UserController}from "../../controller/user.controller";

const router = Router();
const userController = new UserController()

router.get('/logout', userController.logoutUser);

export {router as logoutUser}