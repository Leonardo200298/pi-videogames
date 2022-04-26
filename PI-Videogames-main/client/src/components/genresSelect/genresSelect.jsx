import { useDispatch } from "react-redux";
import { filterByGenre } from '../../store/action'

export default function GenresSelect({genres}){
    console.log(genres)
    const dispatch = useDispatch()
    const handleSelectChange = (e)=>{
        e.preventDefault()
        dispatch(filterByGenre(e.target.value))
    }
    return (
        <div>
             <select onChange={e => handleSelectChange(e)}>
                <option value="all-genres">all-genres</option>               
                {genres?.map((p) => {
                        return (
                            <option key={p.id} value={p.name}>
                                {p.name}
                            </option>
                        );
                    })}                    
                {/* <option value='games'>Por Plataforma</option> */}
            </select> 
        </div>
    )
}