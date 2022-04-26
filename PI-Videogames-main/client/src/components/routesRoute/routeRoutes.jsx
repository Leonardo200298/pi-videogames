import { Route, Routes } from "react-router";
import Home from "../home/home";
import LandingPage from "../landingPage/landingsPage";
import CardDetail from "../cardDetail/cardDetail";
import CreateYourGame from "../createYourGame/createYourGame";

export default function RouteRoutes(){
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route exact path="/videogames" element={<Home/>}/>
                <Route exact path="/detail/:id" element={<CardDetail/>}/>
                <Route path="/videogames/createGame" element={<CreateYourGame/>} />
            </Routes>
        </div>
    )
}