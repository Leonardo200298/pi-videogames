import loadingGif from '../../images/loading.gif'
import './loading.css'

export default function Loading(){
    return (
        <div>
            <img className='loading-gif' src={loadingGif} alt="loading" />
        </div>
    )
}