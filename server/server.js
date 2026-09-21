import express from "express";

const app = express();
app.use(express.json());

app.listen(1000, ()=>{
    console.log("Server listening on port 1000");
})

app.get("/{*any}", (req,res)=>{
    res.send("PAGE NOT FOUND");
})