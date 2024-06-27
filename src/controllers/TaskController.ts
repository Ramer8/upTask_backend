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
      res.send(req.task)
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name
      req.task.description = req.body.description
      await req.task.save()
      res.send("Task updated successfully")
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }

  static deleteTaskById = async (req: Request, res: Response) => {
    try {
      //filter task to delete from the project task list
      req.project.task = req.project.task.filter(
        (task) => task.toString() !== req.task.id
      )
      await Promise.allSettled([req.task.deleteOne(), req.project.save()])
      res.send("Task deleted successfully")
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }

  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      req.task.status = req.body.status
      await req.task.save()
      console.log(req.task)
      res.send("Task updated successfully")
    } catch (error) {
      res.status(500).json({ error: "We have an Error" })
    }
  }
}
