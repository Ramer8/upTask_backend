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

//Allow/enable connections

// const corsOptions: CorsOptions = {
//   origin: function (origin, callback) {
//     console.log(origin)
//   },
// }

// app.use(cors(corsOptions))

///

app.use(cors(corsConfig))

// app.use(cors())
// forma basica de invocar cors

app.use(express.json())

// Routes (is healthy?)
app.get("/api/healthy", (req, res) => {
  res.status(200).json({ success: true, message: "server is healthy" })
})

// Routes
app.use("/api/projects", projectRoutes)

// app.use("/api/auth")
// app.use("/api/proyectos", router)

export default app
