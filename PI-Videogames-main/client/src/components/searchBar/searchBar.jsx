import { useState } from "react"
import { useDispatch } from "react-redux"
import {getVideogameByName} from '../../store/action/index'

export default function SearchBar({setCurrentPage}){
    const [input, setInput] = useState("")
    const dispatch = useDispatch()

    function haddleSetInputValue(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    const handlerSearch = async (e)=>{
        e.preventDefault();
        dispatch(getVideogameByName(input))
        setCurrentPage(1)
        setInput("")
    }


    return (
        <div>
            <form onSubmit={(e) => handlerSearch(e)}> 
                <input onChange={(e)=>haddleSetInputValue(e)} type="text" />
                <button type="submit">search</button>
            </form>
        </div>
    )
}