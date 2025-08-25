import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../constants/student.statuscode";
import { ResponseMessage } from "../constants/students.response-message";
import { HttpError } from "../utils/student.http-error.utils";

export const errorHandler = (err: Error, req: Request, res:Response, next: NextFunction)=> {
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message:string = ResponseMessage.SERVER_ERROR
    if(err instanceof HttpError){
        statusCode = err.statusCode
        message = err.message
    }
    res.status(statusCode).json({
        success: false,
        message: message
    })
}


