import { User } from "../entity/User.entity";

class UserService{
    async createUser(user){
            const createdUser = await User.create(user)
            return createdUser;
    }

    async getAllUsers() {
            const users = await User.find();
            return users;
    }

    async getOneUser(id) {
            if(!id){
                throw new Error('не указан ID')
            }
            const user = await User.findById(id);
            return user;
    }

    async updateUser(user) {
        if(!user.id){
            throw new Error ('не указан ID')
        }
            const updatedUser = await User.findByIdAndUpdate(user.id, user, {new: true})
            return updatedUser;
    }

    async deleteUser(id) {
        if(!id) {
            throw new Error('не указан ID')
        }
            const user = await User.findByIdAndDelete(id);
            return user;
        }
    }

export default new UserService();