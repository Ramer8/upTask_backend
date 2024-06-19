import type { Request, Response } from "express"

export class ProjectController {
  static createProjects = async (req: Request, res: Response) => {
    res.send("creating projects ...")
  }

  static getAllProjects = async (req: Request, res: Response) => {
    res.send("All the projects from ProjectController")
  }
}
