import express from "express"
import { StudentMangementServive } from "../services/student-management.service";
import { Response, Request, NextFunction } from "express";

export class StudentMangementController {
    constructor(private studentMangentSerivice: StudentMangementServive) {}

    getStudent = async(req:Request, res:Response)=>{
        res.render("index")
    }
    
}
