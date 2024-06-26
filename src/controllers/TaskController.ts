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
  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)
      if (!task) {
        const error = new Error("Task not found")
        return res.status(404).json({ error: error.message })
      }

      //check if task belong to this project
      if (task.project.toString() !== req.project.id) {
        const error = new Error("Invalid action")
        return res.status(400).json({ error: error.message })
      }

      res.send(task)
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }

  static updateTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params
      const task = await Task.findByIdAndUpdate(taskId, req.body)
      if (!task) {
        const error = new Error("Task not found")
        return res.status(404).json({ error: error.message })
      }
      if (task.project.toString() !== req.project.id) {
        const error = new Error("Invalid action")
        return res.status(400).json({ error: error.message })
      }
      res.send("Task updated succesfully")
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }
}
