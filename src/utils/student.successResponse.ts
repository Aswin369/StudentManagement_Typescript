import { Response } from "express"
export const successResponse = (res:Response, statusCode:number, message?:string, data?:any)=>{
    console.log("THisis data", data)
    res.status(statusCode).json({
        success:true,
        message:message,
        data:data
    })
}