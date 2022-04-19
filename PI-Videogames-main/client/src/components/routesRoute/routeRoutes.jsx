import { Route, Routes } from "react-router";
import Home from "../home/home";

export default function RouteRoutes(){
    return (
        <div>
            <Routes>
                <Route exact path="/videogames" element={<Home/>}/>
            </Routes>
        </div>
    )
}