import './videogames.css'

export default function Videogames({image,name, rating}){
    return (
        <div className='container-videogames'>
            <h3>{name}</h3>
            <img className='class-image' src={image} alt="images-videogames" />
            <h3>Rating: {rating}</h3>
        </div>
    )
}