import './videogames.css'

export default function Videogames({image,name, rating, genres}){
    return (
        <div className='container-videogames'>
            <h3>{name}</h3>
            <img className='class-image' src={image} alt="images-videogames" />
            <h3>Rating: {rating}</h3>
            <h5>Genres: {genres
                        ? genres.map((p) => p.name + ", ")
                        : genres.map((p) => p.name + ", ")}</h5>
        </div>
    )
}