import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectController {
  static createProjects = async (req: Request, res: Response) => {
    const project = new Project(req.body)
    try {
      await project.save()
      res.send("Project created succesfully")
      // console.log(project, " Project created!!!")
      // res.status(201).json({
      //   success: true,
      //   message: "Project created succesfully",
      //   data: project,
      // })
    } catch (error) {
      if (error.code === 11000) {
        return res.status(404).json({ error: error.message })
      }
    }
  }

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({})
      res.json(projects)
    } catch (error) {
      console.log(error)
    }
    res.send("All the projects from ProjectController")
  }

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const project = await (await Project.findById(id)).populate("task")
      if (!project) {
        const error = new Error("Project not found")
        return res.status(404).json({ error: error.message })
      }
      res.json(project)
    } catch (error) {
      console.log(error)
    }
  }
  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const project = await Project.findById(id)
      if (!project) {
        const error = new Error("Project not found")
        return res.status(404).json({ error: error.message })
      }
      project.clientName = req.body.clientName
      project.description = req.body.description
      project.projectName = req.body.projectName
      await project.save()
      res.send("Project updated successfully")
    } catch (error) {
      console.log(error)
    }
  }

  static deleteProjectById = async (req: Request, res: Response) => {
    const { id } = req.params
    // delete also this tasks of this projects
    try {
      const project = await Project.findById(id)

      if (!project) {
        const error = new Error("Project not found")
        return res.status(404).json({ error: error.message })
      }
      await project.deleteOne()
      res.send("Project deleted successfully")
    } catch (error) {
      console.log(error)
    }
  }
}
