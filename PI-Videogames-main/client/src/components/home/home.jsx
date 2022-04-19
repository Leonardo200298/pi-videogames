import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {getVideogames} from '../../store/action'
import Videogames from "../vdeogames/videogames"
import './home.css'

export default function Home(){
  let videogames = useSelector((state)=>state.allVideogames)
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getVideogames())
  },[])
  console.log(videogames)
    return (
        <div className="home">
            {videogames.map((videogame)=>{
                return <Videogames name={videogame.name} image={videogame.image}/>
            })}
            <Videogames/>
        </div>
    )
}