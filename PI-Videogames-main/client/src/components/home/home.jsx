import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getVideogames } from '../../store/action'
import Videogames from "../vdeogames/videogames"
import Loading from "../loading/loading"
import Paged from "../paged/paged"
import SearchBar from "../searchBar/searchBar"
import './home.css'

export default function Home() {
  let videogames = useSelector((state) => state.allVideogames)
  let oneGame = useSelector((state) => state.game)
  let genres = useSelector((state)=>state.genre)
  let dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [gamePerPage] = useState(15);
  const lastGame = currentPage * gamePerPage;//15
  const firstPage = lastGame - gamePerPage;//valor fijo menos el valor que dice ser la ultima pagina
  const intevalOfGames = videogames.slice(firstPage, lastGame)
  const paged = (number) => {
    setCurrentPage(number)
  }
  useEffect(() => {
    dispatch(getVideogames())
  }, [])
  console.log(videogames)
  return (
    //tal vez pasar lo que voy a poner en otro div
    //recordar pasar la clase home al div que contenga todos los juegos
    <div >
      <Paged
        videogames={videogames.length}
        gamePerPage={gamePerPage}
        paged={paged}
      />
      <SearchBar
        setCurrentPage={setCurrentPage}
      />
      <div className="home">

        {
          oneGame.length ? oneGame.map((videogame) => {
            return <Videogames
              name={videogame.name}
              image={videogame.image}
              rating={videogame.rating}
              key={videogame.id}
              keyID={videogame.id}
              genres={videogame.genre}

            />
          }) :
            intevalOfGames.length ? intevalOfGames.map((videogame) => {
              return <Videogames
                name={videogame.name}
                image={videogame.image}
                rating={videogame.rating}
                key={videogame.id}
                keyID={videogame.id}
                genres={videogame.genre}

              />
            }) : <Loading />
        }
        {/* <Videogames/> */}
      </div>
    </div>
  )
}