import Router from "express";
import UserController from "./controller/UserController";

const router = Router();

    router.post('/users', UserController.createUser)
    router.get('/users', UserController.getAllUsers)
    router.get('/users/:id', UserController.getOneUser)
    router.put('/users', UserController.updateUser)
    router.delete('/users/:id', UserController.deleteUser)

export default router;