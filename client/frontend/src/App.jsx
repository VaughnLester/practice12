import {BrowserRouter, Router, Routes, Route} from "react-router-dom";
import { Home } from "../components/home.jsx";
import { NotFound } from "../components/notFound.jsx";
import { Projects } from "../components/projects.jsx";
import { Project } from "../components/project.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/projects" Component={Projects} />
                <Route path="*" Component={NotFound} />
                <Route path="/project/:id" Component={Project} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
