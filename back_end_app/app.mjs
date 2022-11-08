import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import passport from 'passport';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.post("/login",handleLogin);
app.post("/home",handleHome); 
app.post("/brew",hadnleBrew);//send recipe to frontend
app.post("/feedback",handleFeedBack);//add feedback and record to db
app.post("/create",handleCreate); //add new recipe to db
app.post("/record",handleRecord); //send record to frontend
app.listen(process.env.PORT || 3000);
