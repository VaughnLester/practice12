import express from "express";
import { projectRouter } from "./API/projectsAPI.js";
import path from "path";


const app = express();
const reactBuildPath = path.resolve("../client/frontend/dist");
const reactPath = path.resolve("../client/frontend/dist/index.html");

app.use(express.json());
app.use(projectRouter);
app.use(express.static(reactBuildPath));
//error handling middleware, handles all backend errors so you don't have to do them all manually!!
app.use((err, req, res, next)=>{
    console.log(err);

    res.status(500).json({
        error: "Internal server error"
    });
});


app.listen(1000, ()=>{
    console.log("Server listening on port 1000");
})

app.get("/{*any}", (req,res)=>{
    res.sendFile(reactPath);
})