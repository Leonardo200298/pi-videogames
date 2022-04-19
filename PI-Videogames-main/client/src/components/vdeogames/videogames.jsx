export default function Videogames({image,name}){
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt="images-videogames" />
        </div>
    )
}