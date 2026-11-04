import { Link } from "react-router-dom"

function Home(){
    return(
    <>
        <header>HOME PAGE</header>
        <h1>HELLO WORLDS</h1>
        <Link to="/projects">Project Page</Link>
    
    </>
    )
}

export {Home}