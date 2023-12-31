import express from "express";
import path from "path";
import "./db.mjs";
import { fileURLToPath } from "url";
import cors from "cors";
import passport from "passport";
import mongoose, { mongo } from "mongoose";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(req.method, req.path, req.body);
  next();
});

const handleCreate = async (req, res) => {
  const Task = mongoose.model("Task");
  const Recipe = mongoose.model("Recipe");
  const body = req.body;
  try {
    const task = await Task.create({
      tasks: body.tasks,
    });
    console.log(`created ${body.tasks}`);
    await Recipe.create({
      brewEquip: body.brewEquip,
      bean: body.bean,
      tasks: task._id,
    });
    res.send("success");
  } catch (err) {
    console.log(`error when creating doc: ${err}`);
  }
};

const handleAddRecord = async (req, res) => {
  const Record = mongoose.model("Record");
  const body = req.body;
  try {
    const record = await Record.create({
      feedback: body.Feedback,
      recipe: body.recipe,
      time: body.time,
    });
    // console.log(`created ${body.tasks}`);
    res.send("success");
  } catch (err) {
    console.log(`error when creating doc: ${err}`);
  }
};

const handleRecipes = async (req, res) => {
  const Task = mongoose.model("Task");
  const Recipe = mongoose.model("Recipe");
  Recipe.find()
    .populate("tasks")
    .exec((err, recipe) => {
      if (err) {
        console.log("error");
      }
      res.send(recipe);
    });
};

const handleRecords = async (req, res) => {
  const Record = mongoose.model("Record");
  const Recipe = mongoose.model("Recipe");
  const Task = mongoose.model("Task");
  Record.find()
    .populate({ path: "recipe", populate: { path: "tasks", model: "Task" } })
    .exec((err, record) => {
      if (err) {
        console.log("error");
      }
      res.send(record);
    });
};
// app.post("/login", handleLogin);
// app.post("/home", handleHome);pp.post("/brew", hadnleBrew); //send recipe to frontend
// app.post("/feedback", handleFeedBack); //add feedback and record to db
// app.options('/create', cors())
app.post("/appendRecord", handleAddRecord);
app.post("/records", handleRecords);
app.post("/create", handleCreate); //add new recipe to db
// app.options('/recipes', cors())
app.post("/recipes", handleRecipes);
// app.post("/record", handleRecord); //send record to frontend

const port = process.env.PORT || 5000;
console.log("listen on", port);
app.listen(port);
