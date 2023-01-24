import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User";

/**
 * Loads all users from the database.
 */
export async function userGetAllAction(request: Request, response: Response) {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);

    // load users
    const users = await userRepository.find();

    // return loaded users
    response.send(users);
}
