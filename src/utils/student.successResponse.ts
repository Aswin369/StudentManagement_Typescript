import { Response } from "express"
export const successResponse = (res:Response, statusCode:number, message?:string, data?:any)=>{
    console.log("THisi response statusCode,message",statusCode,message)
    res.status(statusCode).json({
        success:true,
        message:message,
        data:data
    })
}