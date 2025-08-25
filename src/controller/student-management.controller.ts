import express from "express"
import { StudentMangementServive } from "../services/student-management.service";
import { Response, Request, NextFunction } from "express";
import { createHttpError } from "../utils/student.http-error.utils";
import { HttpStatus } from "../constants/student.statuscode";
import { ResponseMessage } from "../constants/students.response-message";
import { successResponse } from "../utils/student.successResponse";

export class StudentMangementController {
    constructor(private studentMangentSerivice: StudentMangementServive) {}

    getStudent = async(req:Request, res:Response,next:NextFunction)=>{
        try {
        const studentData = await this.studentMangentSerivice.getStudent()
        res.render("index",{
            studentData
        })
        } catch (error) {
            next(error)
        }
        
    }

    addStudent= async(req:Request, res:Response,next: NextFunction)=>{
        try{
        console.log("This is req.body",req.body)
        const {students} = req.body
            console.log("srusafd", students)
        // console.log("r and p",rollnumber, phonenumber);
        if(!students.studentname || !students.rollnumber || !students.classes || !students.gender || !students.gender || !students.phonenumber){
            throw createHttpError(HttpStatus.BAD_REQUEST, ResponseMessage.BAD_REQUEST)
        }
        await this.studentMangentSerivice.createStudent({
            name: students.studentname,
            rollNumber:Number(students.rollnumber),
            StudentClass: students.classes,
            gender:students.gender,
            phoneNumber:Number(students.phonenumber)
        })
        successResponse(res,HttpStatus.CREATED, ResponseMessage.CREATED)
        }catch(err:any){
            next(err)
        }
    }
    
    async getEdit(req:Request, res:Response,next:NextFunction){
        try {
            const id = req.params.id
            console.log("This. id", id)
        if(!id){
            console.log("This is error")
           throw createHttpError(HttpStatus.BAD_REQUEST, ResponseMessage.BAD_REQUEST)
        }
        const result = await this.studentMangentSerivice.getEditdata(id)
        console.log("This is from backend",result)
        if(!result){
            console.log("This is not foud error block");
            
            throw createHttpError(HttpStatus.NOT_FOUND, ResponseMessage.NOT_FOUND)
        }
        successResponse(res,HttpStatus.OK,ResponseMessage.FOUND,result)
        } catch (error) {
            next(error)
        }
    }

}
