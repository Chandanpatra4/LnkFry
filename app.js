import express from 'express';
import { nanoid } from 'nanoid';
import connectDB from "./src/config/mongo.config.js"
import dotenv from 'dotenv';


import short_url from './src/routes/short_url.route.js';
import { redirectFromShortUrl } from './src/controller/short_url.controller.js';
dotenv.config("./.env");
const app = express()
connectDB();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create", short_url);

app.get("/:id", redirectFromShortUrl)

app.listen(4000, () => {

    console.log('Server is running on port http://localhost:4000');
})