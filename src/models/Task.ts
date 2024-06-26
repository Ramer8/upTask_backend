import mongoose, { Schema, Document, Types } from "mongoose"
const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGRESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed",
} as const

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus]
// keyof take only the key of this object to type the TaskStatus variable
//Object.values(taskStatus) is the equivalent in JavaScript
export interface ITask extends Document {
  name: string
  description: string
  // project: Types.ObjectId
  project: string
  status: TaskStatus
}

export const TaskSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Types.ObjectId,
      ref: "Project",
    },
    status: {
      type: String,
      enum: Object.values(taskStatus), //the state only accept the object taskStatus defined before
      default: taskStatus.PENDING, // define taskStatus default value, asing value of TaskStatus object
    },
  },
  { timestamps: true }
)

const Task = mongoose.model<ITask>("Task", TaskSchema)

export default Task
