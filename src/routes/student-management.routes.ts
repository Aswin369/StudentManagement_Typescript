import express  from "express";
import { StudentMangementServive } from "../services/student-management.service";
import { StudentMangementController } from "../controller/student-management.controller";
const routes = express.Router();

let studentMangementController = new StudentMangementController(new StudentMangementServive());

routes.get("/",studentMangementController.getStudent.bind(studentMangementController))
routes.post("/addstudent",studentMangementController.addStudent.bind(studentMangementController))
routes.get("/getEdit/:id",studentMangementController.getEdit.bind(studentMangementController))
routes.put("/editFrom", studentMangementController.updateStudent.bind(studentMangementController))
export default routes