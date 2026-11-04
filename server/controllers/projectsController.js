import { db } from "../database.js";


export async function getProjects(req, res){
    try{
        const data = await db.query("SELECT * FROM projects");
        res.json(data);
    }
    catch(err){console.log(err)}
}

export async function getProject(req, res){
    try{
        const data = await db.query(`SELECT * FROM projects WHERE ID = ${req.params.id}`)
        res.json(data);
    }
    catch(err){console.log(err)}
}

export async function createProject(req, res){
    try{
        await db.query(`INSERT INTO projects (title, link) VALUES("${req.body.title}", "${req.body.link}")`)
        res.send(`Project ${req.body.title} created`)
    }
    catch(err){next(err);}
}

export async function deleteProject(req, res){
    try{
        await db.query(`DELETE FROM projects WHERE ID = ${req.body.id}`)
        res.send("Project deleted");
    }
    catch(err){console.log(err)}
}

export async function updateProject(req, res){
    try{
        const title = req.body.title;
        if(!title.trim()){
            res.status(400).json({
                error: "Title is required"
            })
        }
        await db.query(`UPDATE projects SET title = "${req.body.title}" WHERE ID = "${req.params.id}"`)
        res.send("project updated");
    }
    catch(err){console.log(err)}
}