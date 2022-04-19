import loading from '../../images/old-school-video-games.gif'
import {Link} from 'react-router-dom'
import './landingPage.css'

export default function LandingPage(){
    return (
        <div className='landingPage'>
            <img className='image' src={loading} alt="loading" />
            <Link to='/videogames'>
                <button>Enter</button>
            </Link>
        </div>
    )
}