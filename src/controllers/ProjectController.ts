import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {
  static createProjects = async (req: Request, res: Response) => {
    const project = new Project(req.body)
    try {
      await project.save()
      //   res.send("Project created succesfully")
      res.status(201).json({
        success: true,
        message: "Project created succesfully",
        data: project,
      })
    } catch (error) {
      console.log(error)
    }
  }

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({})
      res.json(projects)
    } catch (error) {}
    res.send("All the projects from ProjectController")
  }
}
