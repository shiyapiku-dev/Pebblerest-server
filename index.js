import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit:"15mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"15mb", extended: true}));
app.use(cors());

//Import Routes
import postRoute from './routes/posts.js';

//Middleware
app.use('/posts', postRoute);

app.get('/',(req,res) => {
    res.send('Welcome to Pebble Rest API');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.US_DB_CONNECT, {useNewUrlParser:true, useUnifiedTopology:true })
    .then(() => app.listen(PORT, () => console.log(`Connected to DB!\nServer running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);