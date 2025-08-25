import express  from "express";
import { StudentMangementServive } from "../services/student-management.service";
import { StudentMangementController } from "../controller/student-management.controller";
const routes = express.Router();

let studentMangementController = new StudentMangementController(new StudentMangementServive());

routes.get("/",studentMangementController.getStudent)
export default routes