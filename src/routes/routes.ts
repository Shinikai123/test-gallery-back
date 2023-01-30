import {Router} from "express";
import {UserController}from "../controller/UserController";

const router = Router();
const userController = new UserController()

router.post('/register', userController.registerUser),
router.post('/login', userController.loginUser),
router.get('/logout', userController.logoutUser),
router.get('/users', userController.getAllUsers),
router.get('/users/:id', userController.getUser),
router.get('/refresh', userController.refresh)
    
export default router;