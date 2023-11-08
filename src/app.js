import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import EMPLOYEES_ROUTER from "./routes/employees.router.js"

import { SERVER_PORT } from "./config.js"

const app = express()

app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => {
   res.send("<a href='/employees'>Get Employees</a>")
})


app.use(EMPLOYEES_ROUTER)

app.use((req, res) => {
   res.status(404).send("Not found")
})

app.listen(SERVER_PORT, console.log(`Listening http://localhost:${SERVER_PORT}`))