import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


function Projects(){
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //getProjects
    async function getProjects(){
        try{
                const data = await fetch("/api/projects");
                const results = await data.json();
                setProjects(results[0])
                console.log(projects)
        }
        catch(err){console.log(err)}
    }

    //deleteProject
    async function deleteProject(id){
        try{
            setLoading(true);
            setError("");
            await fetch("/api/delete/",{
                method: "DELETE",
                body: JSON.stringify({
                    id: id
                }),
                headers: {"Content-type":"application/json"}
            });
            getProjects();
        }
        catch(err){setError("Error deleting project");console.log(err)}
        finally{
            setLoading(true);
        }
    }

    //updateProject
    async function updateProject(e,id){
        try{
            setLoading(true);
          e.preventDefault();
          const form = new FormData(e.target);
          const title = form.get("title");
          if(!title.trim()){
            setError("Title Required");
            return;
          }
          await fetch(`/api/update/${id}`,{
            method: "PATCH",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify({
                title: form.get("title"),
                id: form.get("id")
            })
          })
          getProjects();
        }
        catch(err){console.log(err)}
        finally{setLoading(false)}
    }

    //READ ALL 
    useEffect(()=>{

        getProjects();
    },[])

    useEffect(()=>{
        async function getProjects(){
            try{
                 const data = await fetch("/api/projects");
                 const results = await data.json();
                 const filteredResults = results[0].filter((project) =>project.title.toLowerCase().includes(input.toLowerCase()));
                 setProjects(filteredResults);
            }
            catch(err){console.log(err)}
        }
        getProjects();
    },[input])

    //CREATE PROJECT
    async function createProject(e){
        try{
            e.preventDefault();
            const form = new FormData(e.target);
            const res = await fetch("/api/createProject",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    title: form.get("title"),
                    link: form.get("link")
                })
            })
            if (!res.ok){throw new Error("Error with respone!")}
            getProjects();
        }
        catch(err){console.log(err)}
    }

    return(
        <>  
        {/*READ ALL FILTER*/}
            <label form="search">Filter Projects</label>
            <form>
                <input name="search" placeholder="Search" value={input} onChange={(e)=>{setInput(e.target.value)}}></input>
                <button type="submit">Submit</button>
            </form>
        {/*READ ALL*/}
        {/*READ BY ID LINK*/}
            {projects.map((project)=>(
                <div key={project.id}>
                    <h1>Project: {project.title}</h1> 
                    <Link to={`/project/${project.id}?author=Vaughn`}>View Project!</Link>
                    {/*DELETE*/}
                    <button onClick={()=>deleteProject(project.id)}>Delete</button>{error}
                {/*UPDATE - Change title */}    
                <form key={project.id} disabled={loading} onSubmit={(e)=>updateProject(e,project.id)}>
                    <input name="title" placeholder="New Title"></input>
                    <button type="submit">Submit</button>
                </form>
                </div>    
            ))} 
            {/*CREATE - finish this*/}
            <label form="createProject">NEW PROJECT</label>
            <form name="createProject" onSubmit={createProject}>
                <input name="title" placeholder="Title"></input>
                <input name="link" placeholder="Link"></input>
                <button type="submit" placeholder="Submit">Submit</button>
            </form>
        </>
    )
}

export {Projects}