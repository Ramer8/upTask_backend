import type { Request, Response } from "express"
import Task from "../models/task"
import Project from "../models/Project"

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params

    const project = await Project.findById(projectId)
    if (!project) {
      const error = new Error("Project not found")
      return res.status(404).json({ error: error.message })
    }

    try {
      const task = new Task(req.body)
      task.project = projectId
      project.task.push(task.id)

      await task.save()
      await project.save()
      console.log(task)

      res.send("Task created successfully")
    } catch (error) {
      console.log(error)
    }
  }
}
