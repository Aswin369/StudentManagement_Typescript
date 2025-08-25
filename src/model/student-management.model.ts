import mongoose, { Mongoose, Schema } from "mongoose";
import { StudentMangement } from "../types/student-management.types";

const studentManagmentSchmea = new Schema<StudentMangement>({
    name: {
        type:String,
        required:true
    },
    rollNumber: {
        type: Number,
        required: true
    },
    StudentClass:{
        type:String,
        enum:["class 1","class 2","class 3","class 4",
      "class 5","class 6","class 7","class 8",
      "class 9","class 10","class 11","class 12"],
      required:true
    },
    gender:{
        type:String,
        enum:["male", "female","other"],
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    }
})

export const studentModel = mongoose.model<StudentMangement>("Student", studentManagmentSchmea)
