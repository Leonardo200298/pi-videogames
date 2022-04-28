import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { getDetailById, cleanStateDetail } from '../../store/action/index'
import Loading from "../loading/loading"
import './cardDetail.css'

export default function CardDetail() {
    const { id } = useParams()
    let dispatch = useDispatch()
    const navigate = useNavigate()
    let details = useSelector((state) => state.detail)
    console.log('detalles del juego', details)
    useEffect(() => {
        dispatch(getDetailById(id))
    }, [dispatch])
    return (

        details.length > 0 ? (
            <div className="detailCard">

                <>
                    <div>

                        <h4>name: {details[0].name}</h4>
                        <button onClick={()=>{navigate('/videogames')
                        dispatch(cleanStateDetail())
                        }}>X</button>
                    </div>
                    <img className="imageCard" src={details[0].image} alt="" />
                    <h4>Genres: {
                        details[0].genre.map((p) => p.name + " ")
                    }</h4>

                    <h4>Platforms: {details[0].platform[0].platform ?
                        details[0].platform.map((e) => e.platform.name + " ") :
                        details[0].platform.map((e) => e + " ")
                    }</h4>
                    <h4>Released: {details[0].released}</h4>
                    <h4>Description: {details[0].description}</h4>
                </>
            </div>
        ) : <Loading />
    )
}