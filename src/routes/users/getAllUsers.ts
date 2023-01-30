import {Router} from "express";
import {UserController}from "../../controller/UserController";

const router = Router();
const userController = new UserController()

router.get('/users', userController.getAllUsers);

export {router as getAllUsers}