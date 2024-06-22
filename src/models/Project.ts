import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose"
import { ITask } from "./task"

export interface IProject extends Document {
  projectName: string
  clientName: string
  description: string
  task: PopulatedDoc<ITask & Document>[]
}

const ProjectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      //also do with code
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    task: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
)

const Project = mongoose.model<IProject>("Project", ProjectSchema)

export default Project
