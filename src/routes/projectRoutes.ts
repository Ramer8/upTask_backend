import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"
import { TaskController } from "../controllers/TaskController"
import { validateProjectsExists } from "../middleware/projects"
const router = Router()

// Project Routes
router.post(
  "/",
  body("projectName").notEmpty().withMessage("Project name is required"),

  body("clientName").notEmpty().withMessage("Name is required"),

  body("description").notEmpty().withMessage("Description is required"),
  handleInputErrors,
  ProjectController.createProjects
)
router.get("/", ProjectController.getAllProjects)

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID invalid"),
  handleInputErrors,
  ProjectController.getProjectById
)
router.put(
  "/:id",
  body("projectName").notEmpty().withMessage("Project name is required"),

  body("clientName").notEmpty().withMessage("Name is required"),

  body("description").notEmpty().withMessage("Description is required"),
  param("id").isMongoId().withMessage("ID invalid"),
  handleInputErrors,
  ProjectController.updateProject
)
router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID invalid"),
  handleInputErrors,
  ProjectController.deleteProjectById
)

//Task Routes

router.param("projectId", validateProjectsExists)

router.post(
  "/:projectId/tasks",
  // validateProjectsExists,
  body("name").notEmpty().withMessage("Task name is required"),
  body("description").notEmpty().withMessage("Task description is required"),
  handleInputErrors,
  TaskController.createTask
)

router.get(
  "/:projectId/tasks",
  // validateProjectsExists,
  TaskController.getProjectTask
)
router.get(
  "/:projectId/tasks/:taskId",
  //validate taskId
  param("taskId").isMongoId().withMessage("ID invalid"),
  handleInputErrors,

  // validateProjectsExists,
  TaskController.getTaskById
)
router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID invalid"),
  body("name").notEmpty().withMessage("Task name is required"),
  body("description").notEmpty().withMessage("Task description is required"),
  handleInputErrors,
  TaskController.updateTask
)

export default router
