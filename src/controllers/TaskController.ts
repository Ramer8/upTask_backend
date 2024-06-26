import type { Request, Response } from "express"
import Task from "../models/task"
import Project from "../models/Project"

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body)
      task.project = req.project.id
      req.project.task.push(task.id)

      await Promise.allSettled([task.save(), req.project.save()])

      res.send("Task created successfully")
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }
  static getProjectTask = async (req: Request, res: Response) => {
    try {
      const projectId = req.project.id
      const tasks = await Task.find({ project: projectId }).populate("project")
      res.send(tasks)
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }
}
