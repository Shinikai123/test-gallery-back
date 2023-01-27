import { getRepository } from "typeorm";
import { User } from "../entity/User.entity";
import  UserService from "../service/UserService";

class UserController {

    private userRepository = getRepository(User)

    async createUser(req, res){
        try {
            const user = await UserService.createUser(req.body)
            res.json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            return res.json(users);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOneUser(req,res) {
        try{
            const user = await UserService.getOneUser(req.params.id)
            return res.json(user)
        } catch(e) {
            res.status(500).json(e)
        }
    }

    async updateUser(req, res) {
        try{
            const updatedUser = await UserService.updateUser(req.body);
            return res.json(updatedUser);
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async deleteUser(req, res) {
        try{
            const user = await UserService.createUser(req.params.id);
            return res.json(user)
        } catch(e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController();