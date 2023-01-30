import {Router} from "express";
import {UserController} from "../../controller/UserController";


const router = Router()
const userController = new UserController()

router.get('/refresh', userController.refresh)

export {router as refreshToken};