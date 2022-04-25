import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { useParams } from 'react-router'
import {getDetailById} from '../../store/action/index'
import Loading from "../loading/loading"
import './cardDetail.css'

export default function CardDetail(){
    const {id} = useParams()
    let dispatch =useDispatch()
    let details = useSelector((state)=>state.detail)
    useEffect(()=>{
        dispatch(getDetailById(id))
    },[dispatch])
    return (
        <div className="detailCard">
           {details.length ? (
               <>
                   name:{details[0].name}
                   <img className="imageCard" src={details[0].image} alt="" />
                   Genres: {details[0].genre.map((p)=>  p.name+", ")}
               </>
           ):<Loading/>}
        </div>
    )
}