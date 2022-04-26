import {Link} from 'react-router-dom'

export default function ButtonToForm(){
    return (
        <div>
            <Link to='/videogames/createGame'>
                <button>create your own game!!</button>
            </Link>
        </div>
    )
}