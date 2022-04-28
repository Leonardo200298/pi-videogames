import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { createVideogame } from '../../store/action/index'
import './createYourGame.css';

export function validate(input) {
    let error = {}
    if (!input.name) {
        error.name = 'Name is required'
    }
    if (!input.image) {
        error.image = 'Image is required'
    }
    if (!input.released) {
        error.released = 'Released is required'
    }
    if (!input.platform) {
        error.platform = 'Platform is required'
    }
    return error;
}

export default function CreateYourGame() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genre)
    const platform = [
        { name: "PC" },
        { name: "PlayStation 1" },
        { name: "PlayStation 2" },
        { name: "PlayStation 3" },
        { name: "PlayStation 4" },
        { name: "PlayStation 5" },
        { name: "XBox 360" },
        { name: "XBox One" },
        { name: "XBox Series X" },
        { name: "Nintendo" },
        { name: "Wii" },
        { name: "Sega" },
    ];
    const [input, setInput] = useState({
        id: uuidv4(),
        name: '',
        image: '',
        description: '',
        released: '',
        rating:'',
        platforms: [],
        genre: []
    })
    console.log(input.platforms)
    const [error, setError] = useState({})

    const handleForm = (e) => {
        e.preventDefault()
        dispatch(createVideogame(input))
        setInput({})
    }

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    const handleSelectChange = (e) => {
        e.preventDefault();
        var gener = genres.find((elemento) => elemento.name === e.target.value)
        setInput({
            ...input,
            genre: [...input.genre, gener.id]
        })


    }
    const handleSelectChangePlatformm = (e) => {
        /* var plat = platform.find((elemento) => elemento.name === e.target.value) */
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
            
        })
        
    }
    
    return (
        <div className='content-page-form'>
            <form onSubmit={(e) => handleForm(e)} className="content-form">
                <input onChange={(e) => handleInputChange(e)} name="name" placeholder='Name' value={input.name} type="text" />
                {error.name && (
                    <p className="danger">{error.name}</p>
                )}
                <input onChange={(e) => handleInputChange(e)} name="released" placeholder='released' value={input.released} type="text" />
                {error.released && (
                    <p className="danger">{error.released}</p>
                )}
                <input onChange={(e) => handleInputChange(e)} name="image" placeholder='image' value={input.image} type="text" />
                {error.image && (
                    <p className="danger">{error.image}</p>
                )}
                <input onChange={(e) => handleInputChange(e)} name="description" placeholder='description' value={input.description} type="text" />
                {error.description && (
                    <p className="danger">{error.description}</p>
                )}
                 <input onChange={(e) => handleInputChange(e)} name="rating" placeholder='rating' value={input.rating} type="text" />
                {error.rating && (
                    <p className="danger">{error.rating}</p>
                )}
                <div >
                    <select name="genre" onChange={(e) => handleSelectChange(e)}>
                        <option value='all'>All-genres</option>
                        {genres && genres.map((genr) => {
                            return (
                                <option
                                    key={genr.id}

                                    value={genr.name}>
                                    {genr.name}
                                </option>
                            );
                        })}

                    </select>


                </div>
                <div >
                    <select name="platform" onChange={(e) => handleSelectChangePlatformm(e)}>
                        <option value='all'>All-platforms</option>
                        {platform && platform.map((platforms) => {
                            return (
                                <option
                                    key={platforms.id}

                                    value={platforms.name}>
                                    {platforms.name}
                                </option>
                            );
                        })}

                    </select>


                </div>

                <input className='button-create' type="submit" value="Create" />
            </form>
        </div>
    )
}