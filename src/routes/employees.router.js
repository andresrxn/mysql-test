import express from "express"
import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee, updatePartialEmployee } from "../controllers/employees.controller.js"


const EMPLOYEES_ROUTER = express.Router()
EMPLOYEES_ROUTER.use(express.text())
EMPLOYEES_ROUTER.use(express.json())


EMPLOYEES_ROUTER.get("/employees", getEmployees)
EMPLOYEES_ROUTER.get("/employees/:id", getEmployee)
EMPLOYEES_ROUTER.post("/employees", createEmployee)
EMPLOYEES_ROUTER.put("/employees/:id", updateEmployee)
EMPLOYEES_ROUTER.patch("/employees/:id", updatePartialEmployee)
EMPLOYEES_ROUTER.delete("/employees/:id", deleteEmployee)



export default EMPLOYEES_ROUTER;