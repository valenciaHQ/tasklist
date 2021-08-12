import mongoose from "mongoose";

/* PetSchema will correspond to a collection in your MongoDB database. */
const TaskSchema = new mongoose.Schema({
  title: {
    /* The name of this pet */

    type: String,
    required: [true, "Please provide a title for this task."],
  },
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
