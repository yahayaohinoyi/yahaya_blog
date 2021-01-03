import express from 'express';
import PostUseCase from '../usecase/post_usecase';

import PostHandler from '../delivery:http/post_handler';

const api = express.Router();


export default function newHttpUserDelivery(usecase: PostUseCase){

    const handler = new PostHandler(usecase);
    api.route('/post').post((req, res, next) => handler.createPost(req, res, next));
    api.route('/post').delete((req, res, next) => handler.deletePost(req, res, next))
    

    return api

}