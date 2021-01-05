import express from 'express';
import PostUseCase from '../usecase/post_usecase';

import PostHandler from '../delivery:http/post_handler';

const api = express.Router();


export default function newHttpUserDelivery(usecase: PostUseCase){

    const handler = new PostHandler(usecase);
    api.route('/post').post((req, res, next) => handler.createPost(req, res, next));
    api.route('/post/get').get((req, res, next) => handler.getPost(req, res, next));
    api.route('/post/fetch').get((req, res, next) => handler.fetchPostsById(req, res, next));
    api.route('/post/like').post((req, res, next) => handler.likePost(req, res, next));
    api.route('/post/unlike').post((req, res, next) => handler.unlikePost(req, res, next));
    api.route('/post/edit').post((req, res, next) => handler.editPost(req, res, next));
    api.route('/post').delete((req, res, next) => handler.deletePost(req, res, next));    

    return api

}