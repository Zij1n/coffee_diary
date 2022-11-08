import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  tasks: [
    {
      time: Number,
      description: String,
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

const recipeSchema=new Schema({
  tasks:{ type: mongoose.SchemaTypes.ObjectId, ref: Task },
  bean: String,
  brewEquip:String
})
const Recipe = mongoose.model("Recipe", recipeSchema);

const User = new Schema({
  title: String, // String is shorthand for {type: String}
  credential: String,
  records: [
    {
      recipe: { info: { water_temp: Number, grinder: String, bean: String } },
      tasks: { type: mongoose.SchemaTypes.ObjectId, ref: Task },
    },
  ],
  comments: [{ body: String, date: Date }],
  stats: {
    numberOfRecord: Number,
  },
});

mongoose.model("User", User);

mongoose.connect(
  "mongodb+srv://user1:user1user1@cluster0.5j2wai7.mongodb.net/?retryWrites=true&w=majority"
);
