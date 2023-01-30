import {Router} from "express";
import {UserController}from "../../controller/UserController";

const router = Router();
const userController = new UserController()

router.get('/logout', userController.logoutUser);

export {router as logoutUser}