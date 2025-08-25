import express from 'express'
import { Response, Request } from 'express'
import dotenv from "dotenv"
import {connection} from "./config/databaseConnection"
import path from 'path'
import routes from "./routes/student-management.routes"
dotenv.config()
const app = express()
connection()
app.set("view engine", "ejs")
app.set("views",path.join(__dirname, "views"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use("/",routes)
app.listen(process.env.PORT,()=>console.log("Server is running"))
