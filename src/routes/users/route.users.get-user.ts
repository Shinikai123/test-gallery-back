import {Router} from "express";
import {UserController}from "../../controller/user.controller";

const router = Router();
const userController = new UserController()

router.get('/users/:id', userController.getUser);

export {router as getUser}