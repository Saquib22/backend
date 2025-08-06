import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true
})) // to allow the origin of which port can listen

app.use(express.json({limit : "16kb"})) // to receive the data in json formate.

app.use(express.urlencoded({limit:"16kb", extended:true})) // for encoding the url like space=%20etc.

app.use(express.static("public")); // to store static file folder such pdf etc.

app.use(cookieParser()); // to store the data in users server.

export { app }