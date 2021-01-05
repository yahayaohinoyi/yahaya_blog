import express from 'express';
import CommentUseCase from '../usecase/comment_usecase';

import PostHandler from '../delivery:http/comment_handler';

const api = express.Router();


export default function newHttpUserDelivery(usecase: CommentUseCase){

    const handler = new PostHandler(usecase);
    api.route('/comment').post((req, res, next) => handler.createComment(req, res, next));
    api.route('/comment/get').get((req, res, next) => handler.getComment(req, res, next));
    api.route('/comment/fetch').get((req, res, next) => handler.fetchCommentsById(req, res, next));
    api.route('/comment/like').post((req, res, next) => handler.likeComment(req, res, next));
    api.route('/comment/unlike').post((req, res, next) => handler.unlikeComment(req, res, next));
    api.route('/comment/edit').post((req, res, next) => handler.editComment(req, res, next));
    api.route('/comment').delete((req, res, next) => handler.deleteComment(req, res, next));    

    return api

}