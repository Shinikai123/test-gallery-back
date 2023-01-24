import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User.entity";

/**
 * Loads user by a given id.
 */
export async function userGetByIdAction(request: Request, response: Response) {

    // get a user repository to perform operations with user
    const userRepository = getManager().getRepository(User);
    const {id} = request.params 

    // load a user by a given post id
    // const user = await userRepository.findOne(request.params.id);
    const user = await userRepository.findOne( {where: {id}});

    // if user was not found return 404 to the client
    if (!user) {
        response.status(404);
        response.end();
        return;
    }

    // return loaded post
    response.send(user);
}
