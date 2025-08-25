import express from "express"
import { StudentMangement } from "../types/student-management.types";
import { studentModel } from "../model/student-management.model";
import { createHttpError } from "../utils/student.http-error.utils";
import { HttpStatus } from "../constants/student.statuscode";
import { ResponseMessage } from "../constants/students.response-message";

export class StudentMangementServive {
    
    async getStudent():Promise<StudentMangement[]>{
        const studentdatas = await studentModel.find()
        return studentdatas
    }

    async createStudent(student: StudentMangement){
        const result = await studentModel.create({
            name:student.name,
            rollNumber: student.rollNumber,
            StudentClass:student.StudentClass,
            gender:student.gender,
            phoneNumber:student.phoneNumber
        })
        // console.log("From service", result);
        if(!result){
            throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR,ResponseMessage.SERVER_ERROR)
        }
    }
    
    async getEditdata(id:string):Promise<StudentMangement  | null>{
        // console.log("This is form service",id)
        const studentData = await studentModel.findOne({_id:id})
        return studentData
    }

    async updateStudent(student:StudentMangement){
        // console.log("This is from service",student)
        const result = await studentModel.create({
            name:student.name,
            rollNumber: student.rollNumber,
            StudentClass:student.StudentClass,
            gender:student.gender,
            phoneNumber:student.phoneNumber
        })
        console.log("This is updated ", result)
        if(!result){
            throw createHttpError(HttpStatus.INTERNAL_SERVER_ERROR,ResponseMessage.SERVER_ERROR)
        }
    }

}