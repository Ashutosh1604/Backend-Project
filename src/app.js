import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app= express();

//for security to specify which domains are allowed to access your server
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

//limit how much json data can accept
app.use(express.json({
    limit: "16kb"
}))


app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))
app.use(cookieParser())

export {app}