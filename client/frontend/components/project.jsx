import { useSearchParams, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Project(){
    const params = useParams();
    const id = params.id;
    console.log(id);
    const [searhParams] = useSearchParams("");
    const author = searhParams.get("author");
    const [project, setProject] = useState([]);


    useEffect(()=>{
        async function getProject(){
            try{
                const data = await fetch(`https://practice12server.onrender.com/api/project/${id}`)
                const result = await data.json();
                setProject(result);
            }
            catch(err){console.log(err)}
        }
        getProject();
    },[])

    console.log(JSON.stringify(project));

    return(
        <><header className="flex flex-row justify-evenly items-center ">
            <h1>Home</h1>
            <h1>Project Page</h1>
            <nav><Link to={'/home'}>Return Home</Link></nav>
        </header>
                {project.map((project, index)=>(
                    <div className="flex flex-col justify-center items-center mx-auto my-9 gap-5 bg-orange-500 p-8 max-w-5xl min-h-[90vh] sm:max-w-xl border-black text-xl font-bold text-center border border-green-500 rounded-lg hover:bg-green-100">
                        <h1>Map Iternation: {index}</h1>
                        <h1>{id}</h1>
                        <h1>{project.title}</h1>
                        <h1>{author}</h1>
                    </div>
                ))}
            <footer><Link to={'/home'}>Return Home</Link></footer>
        </>
    )
}

export {Project}