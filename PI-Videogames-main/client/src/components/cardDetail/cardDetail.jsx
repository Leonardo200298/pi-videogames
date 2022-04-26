import { useDispatch, useSelector } from "react-redux"
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getDetailById } from '../../store/action/index'
import Loading from "../loading/loading"
import './cardDetail.css'

export default function CardDetail() {
    const { id } = useParams()
    let dispatch = useDispatch()
    let details = useSelector((state) => state.detail)
    useEffect(() => {
        dispatch(getDetailById(id))
    }, [dispatch])
    return (
        <div className="detailCard">
            {details.length ? (
                <>
                    <h4>name: {details[0].name}</h4>
                    <img className="imageCard" src={details[0].image} alt="" />
                    <h4>Genres: {
                        details[0].genre.map((p) => p.name + " ")
                    }</h4>
                    <h4>Plataforms: {Array.isArray(details[0].platform)
                        ? details[0].platform.map((p) =>p.platform.name + " ")
                        : " "}</h4>
                    <h4>Released: {details[0].released}</h4>
                </>
            ) : <Loading />}
        </div>
    )
}