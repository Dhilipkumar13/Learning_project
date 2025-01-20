const express = require("express")
const cors  = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const helmet = require("helmet")
const connectDb = require("./config/connectDb")
const errorHandler = require('./middleware/errorHandling')

dotenv.config()
connectDb()

const app = express()
app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(helmet({
    crossOriginResourcePolicy:false
}))
app.use(errorHandler)

const  PORT = process.env.PORT || 8000 ;

app.get("/",(req,res)=>{
    res.json({message:`${process.env.FRONTEND_URL}`})
})
app.use("/api/user",require("./route/userRoutes"))

app.listen(PORT,(req,res)=>{
    console.log("Server is running in port",PORT)
})