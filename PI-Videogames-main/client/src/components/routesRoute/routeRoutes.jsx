import { Route, Routes } from "react-router";
import Home from "../home/home";
import LandingPage from "../landingPage/landingsPage";

export default function RouteRoutes(){
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route exact path="/videogames" element={<Home/>}/>
            </Routes>
        </div>
    )
}