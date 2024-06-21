import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController"
import { body } from "express-validator"
import { handleInputErrors } from "../middleware/validation"
const router = Router()

router.post(
  "/",
  body("projectName").notEmpty().withMessage("Project name is required"),

  body("clientName").notEmpty().withMessage("Name is required"),

  body("description").notEmpty().withMessage("Description is required"),
  handleInputErrors,
  ProjectController.createProjects
)

router.get("/", ProjectController.getAllProjects)

export default router
