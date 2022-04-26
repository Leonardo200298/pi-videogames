import { useDispatch } from "react-redux"


export default function AscDescNameAndRating({setCurrentPage,orderBy}){
    const dispatch = useDispatch()
    const handlerSelect = (e)=>{
        e.preventDefault()
        dispatch(orderBy(e.target.value))
        setCurrentPage(1)
    }
    return (
        <div>
            <select onChange={(e)=>handlerSelect(e)}>
                <option>Orders</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Rating-asc">Rating-asc</option>
                <option value="Rating-desc">Rating-desc</option>
            </select>
        </div>
    )
}