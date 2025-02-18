import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import  connectDB  from "./DB.js"
import path from "path"




dotenv.config({});

const __dirname = path.resolve()



const app = express()


app.get('/', (_, res) =>{
    return res.status(200).json({
        age: 23,
        name :"Aabhiskjdode diwjowi n feio nk"
    })
})


app.use(cors({
    origin: "http://localhost:5173",  
    credentials: true,  
    methods: "GET, POST, PUT, DELETE", 
    allowedHeaders: "Content-Type, Authorization" 
  }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())





connectDB()
.then(()=>{
    app.listen(process.env.PORT || 7000, () => {
        console.log(`server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("Mongo db Connect Failed !!!!!  ", err)
})




import userrouter from "./routes/user.routes.js"
import postrouter from "./routes/post.routes.js"
import messagerouter from "./routes/messages.routes.js"

app.use("/api/v1/users", userrouter)
app.use("/api/v1/post", postrouter)
app.use("/api/v1/message", messagerouter)


app.use(express.static(path.join(__dirname, "/vite-project/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "vite-project", "dist", "index.html"))
})


