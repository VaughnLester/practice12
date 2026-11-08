import express from "express";
import { projectRouter } from "./API/projectsAPI.js";
// import path from "path";
import cors from "cors";
import "dotenv/config";


const app = express();
// const reactBuildPath = path.resolve("../client/frontend/dist");
// const reactPath = path.resolve("../client/frontend/dist/index.html");

app.use(express.json());
//establishing cors for communication between hosted frontend and backend 
app.use(cors({
    origin: "https://practice12-c6pj.onrender.com"
}))
app.use(projectRouter);
// app.use(express.static(reactBuildPath));
//error handling middleware, handles all backend errors so you don't have to do them all manually!!
app.use((err, req, res, next)=>{
    console.log(err);
    //checking to see if a responses was already sent so a second one isn't sent below 
    if(res.headersSent){return next(err);}
    res.status(500).json({
        error: "Internal server error"
    });
});



const PORT = process.env.PORT || 1000;

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)})

// app.get("/{*any}", (req,res)=>{
//     res.sendFile(reactPath);
// })