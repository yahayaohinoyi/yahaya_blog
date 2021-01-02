import express from 'express';
import UserUseCase from '../usecase/user_usecase';

import UserHandler from '../delivery:http/user_handler';

const api = express.Router();


export default function newHttpUserDelivery(usecase: UserUseCase){

    const handler = new UserHandler(usecase);
    
    api.route("/user").post((req, res) => handler.createUser(req, res));
    api.route("/user").delete((req, res) => handler.deleteUser(req, res))
    return api

}