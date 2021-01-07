import express from 'express';
import {connectMongodb} from './config/db/mongo';

import bodyParser from "body-parser";

import UserRepo from './pkgs/user/repository/user_db'
import UserUseCase from './pkgs/user/usecase/user_usecase'
import UserHandler from './pkgs/user/delivery:http/user_routers'

import PostRepo from './pkgs/post/repository/post_db';
import PostUseCase from './pkgs/post/usecase/post_usecase';
import PostHandler from './pkgs/post/delivery:http/post_router'


import CommentRepo from './pkgs/comment/repository/comment_db'
import CommentUseCase from './pkgs/comment/usecase/comment_usecase'
import CommentHandler from './pkgs/comment/delivery:http/comment_router'

const logger = require('morgan')
const app = express();

const UserRepoInit = new UserRepo();
const UserUseCaseInit = new UserUseCase(UserRepoInit);

const PostRepoInit = new PostRepo();
const PostUseCaseInit = new PostUseCase(PostRepoInit);

const CommentRepoInit = new CommentRepo();
const CommentUseCaseInit = new CommentUseCase(CommentRepoInit, PostRepoInit);




connectMongodb()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use('/v1', UserHandler(UserUseCaseInit))
app.use('/v1', PostHandler(PostUseCaseInit))
app.use('/v1', CommentHandler(CommentUseCaseInit))
app.get('/', (req, res) => {

    res.send('Hello world')
})

app.listen(3000, () => console.log('server running'))