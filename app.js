import express from 'express';
import { nanoid } from 'nanoid';
import connectDB from "./src/config/mongo.config.js"
import dotenv from 'dotenv';
import urlSchema from './src/models/shorturl.model.js'
dotenv.config("./.env");
const app = express()
connectDB();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create", (req, res) => {
    const { url } = req.body
    const shortUrl = nanoid(7);
    const newUrl = new urlSchema({
        full_url: url,
        short_url: shortUrl
    })
    newUrl.save()
    res.send(nanoid(7));

});

app.listen(4000, () => {

    console.log('Server is running on port http://localhost:4000');
})