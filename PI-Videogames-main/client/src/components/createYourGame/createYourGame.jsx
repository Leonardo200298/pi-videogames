import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import {createVideogame} from '../../store/action/index'
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
    if (!input.platform){
        error.platform = 'Platform is required'
    }
    return error;
}

export default function CreateYourGame() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genre)
    console.log(genres)
    const [input, setInput] = useState({
        id: uuidv4(),
        name: '',
        image: '',
        released: '',
        platform:[],
        genre: []
    })
    const [error, setError] = useState({})

    const handleForm = (e)=>{
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
    const handleSelectChange = (e)=>{
        e.preventDefault();
        var tipo = genres.find((elemento) => elemento.name === e.target.value)
        setInput({
            ...input,
            genre: [...input.genre, tipo.id]
        })
    }
    return (
        <div className='content-page-form'>
            <form onSubmit={(e)=>handleForm(e)} className="content-form">
                <input onChange={(e)=>handleInputChange(e)} name="name" placeholder='Name' value={input.name} type="text" />
                {error.name && (
                    <p className="danger">{error.name}</p>
                )}
                <input onChange={(e)=>handleInputChange(e)} name="released" placeholder='released' value={input.released} type="text" />
                {error.released && (
                    <p className="danger">{error.released}</p>
                )}
                <input onChange={(e)=>handleInputChange(e)} name="image" placeholder='image' value={input.image} type="text" />
                {error.image && (
                    <p className="danger">{error.image}</p>
                )}
                 <input onChange={(e)=>handleInputChange(e)} name="platform" placeholder='platform' value={input.platform} type="text" />
                {error.platform&& (
                    <p className="danger">{error.platform}</p>
                )}
                   <div >
                    <select name="genre" onChange={(e) => handleSelectChange(e)}>
                        <option value='all'>All-genres</option>
                        {console.log(genres)}
                        {genres && genres.map((genr) => {
                            {console.log(genr.name)}
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

                <input className='button-create' type="submit" value="Create" />
            </form>
        </div>
    )
}