import { Router } from "express"
import { ProjectController } from "../controllers/ProjectController"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation"
import { TaskController } from "../controllers/TaskController"
import { validateProjectsExists } from "../middleware/projects"
import { taskBelongToProject, validateTaskExists } from "../middleware/tasks"
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

//Validation from middlewares
router.param("projectId", validateProjectsExists)
router.param("taskId", validateTaskExists)
router.param("taskId", taskBelongToProject)

router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("Task name is required"),
  body("description").notEmpty().withMessage("Task description is required"),
  handleInputErrors,
  TaskController.createTask
)

router.get("/:projectId/tasks", TaskController.getProjectTask)

router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID invalid"),
  handleInputErrors,
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

router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID invalid"),
  handleInputErrors,
  TaskController.deleteTaskById
)

router.post(
  "/:projectId/tasks/:taskId/status",
  param("taskId").isMongoId().withMessage("ID invalid"),
  body("status").notEmpty().withMessage("Status is required"),
  handleInputErrors,
  TaskController.updateTaskStatus
)
export default router
