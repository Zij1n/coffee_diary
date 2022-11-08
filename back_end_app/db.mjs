import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  credential: String,
  records: [
    {
      recipe: { info: { water_temp: Number, grinder: String, bean: String } },
      tasks: [{ time: Number, discription: String }],
    },
  ],
  comments: [{ body: String, date: Date }],
  stats: {
    numberOfRecord: Number,
  },
});
