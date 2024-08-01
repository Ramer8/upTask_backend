import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { corsConfig } from "./config/cors"
import { connectDB } from "./config/db"
import projectRoutes from "./routes/projectRoutes"
// import router from "./routes/projectRoutes"

dotenv.config()
connectDB()

const app = express()
app.use(cors(corsConfig))

// Basic way to use cors by Ramer
// app.use(cors())

app.use(express.json())

// Routes (is healthy?)
app.get("/api/healthy", (req, res) => {
  res.status(200).json({ success: true, message: "server is healthy" })
})
// with cors not working from thunderclient by Ramer

// Routes
app.use("/api/projects", projectRoutes)

// app.use("/api/auth")
// app.use("/api/proyectos", router)

export default app
