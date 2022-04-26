import './videogames.css'
import { Link } from "react-router-dom";

export default function Videogames({ image, name, rating, genres, key, keyID}) {
    return (
        <div className='container-videogames'>
            <Link to={`/detail/${keyID}`}>
                <h3>{name}</h3>
            </Link>

            <img className='class-image' src={image} alt="images-videogames" />
            <h3>Rating: {rating}</h3>
            <h5>Genres: {genres
                ? genres.map((p) => p.name + ", ")
                : genres.map((p) => p.name + ", ")}</h5>
        </div>
    )
}