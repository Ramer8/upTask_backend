import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController"
// import { ProjectControl } from "../controllers/project.controller"

const router = Router()

router.get("/", ProjectController.getAllProjects)
// router.get("/", ProjectControl)
export default router
