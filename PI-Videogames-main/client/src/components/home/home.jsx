import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {getVideogames} from '../../store/action'

export default function Home(){
  let videogames = useSelector((state)=>state.allVideogames)
  let dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getVideogames())
  },[])
  console.log(videogames)
    return (
        <div>
            <h1>Hola</h1>
        </div>
    )
}