import type { Request, Response } from "express"
import Task from "../models/task"

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
      //   if (!task) {
      //     const error = new Error("Task not found")
      //     return res.status(404).json({ error: error.message })
      //   }

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
      const task = await Task.findById(taskId)
      //   if (!task) {
      //     const error = new Error("Task not found")
      //     return res.status(404).json({ error: error.message })
      //   }
      if (task.project.toString() !== req.project.id) {
        const error = new Error("Invalid action")
        return res.status(400).json({ error: error.message })
      }
      task.name = req.body.name
      task.description = req.body.description
      await task.save()
      res.send("Task updated successfully")
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }
  static deleteTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)
      //   if (!task) {
      //     const error = new Error("Task not found")
      //     return res.status(404).json({ error: error.message })
      //   }

      //fitler task to delete from the project task list
      req.project.task = req.project.task.filter(
        (task) => task.toString() !== taskId
      )
      await Promise.allSettled([task.deleteOne(), req.project.save()])
      res.send("Task deleted successfully")
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }
  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params
      const task = await Task.findById(taskId)
      //   if (!task) {
      //     const error = new Error("Task not found")
      //     return res.status(404).json({ error: error.message })
      //   }

      task.status = req.body.status
      await task.save()
      console.log(task)
      res.send("Task updated successfully")
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }
}
