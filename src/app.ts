import express from 'express';
import {connectMongodb} from './config/db/mongo';
import UserRepo from './pkgs/user/repository/user_db'
import UserUseCase from './pkgs/user/usecase/user_usecase'
import UserHandler from './pkgs/user/delivery:http/user_routers'
import bodyParser from "body-parser";
const logger = require('morgan')
const app = express();

const UserRepoInit = new UserRepo();
const UserUseCaseInit = new UserUseCase(UserRepoInit);




connectMongodb()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use('/v1', UserHandler(UserUseCaseInit))
app.get('/', (req, res) => {

    res.send('Hello world')
})

app.listen(3000, () => console.log('server running'))