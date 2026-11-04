import express from "express";
import { deleteProject, getProjects, updateProject } from "../controllers/projectsController.js";
import { getProject } from "../controllers/projectsController.js";
import { createProject } from "../controllers/projectsController.js";

const projectRouter = express.Router();


projectRouter.get("/api/projects",getProjects);
projectRouter.get("/api/project/:id", getProject);
projectRouter.post("/api/createProject", createProject);
projectRouter.delete("/api/delete", deleteProject);
projectRouter.patch("/api/update/:id", updateProject)


export {projectRouter}