import mongoose, { Schema, Document } from "mongoose"

export interface IProject extends Document {
  projectName: string
  clientName: string
  description: string
}

const ProjectSchema: Schema = new Schema({
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
})

const Project = mongoose.model<IProject>("Project", ProjectSchema)

export default Project
