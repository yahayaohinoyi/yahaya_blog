import express from 'express';
import {connectMongodb} from './config/db/mongo';
const logger = require('morgan')
const app = express();


connectMongodb()
app.use(logger('dev'));
app.get('/', (req, res) => {

    res.send('Hello')
})

app.listen(3000, () => console.log('server running'))