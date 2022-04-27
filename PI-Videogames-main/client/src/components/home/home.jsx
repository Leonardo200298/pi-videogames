import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getVideogames, getByGenre, orderBy } from '../../store/action'
import Videogames from "../vdeogames/videogames"
import Loading from "../loading/loading"
import Paged from "../paged/paged"
import SearchBar from "../searchBar/searchBar"
import GenresSelect from "../genresSelect/genresSelect"
import AscDescNameAndRating from "../ascDescNameAndRating/ascDescNameAndRating"
import ButtonToForm from "../buttonToForm/buttonToForm"
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
  console.log(genres)
  useEffect(() => {
    dispatch(getVideogames())
    dispatch(getByGenre())
  }, [dispatch])

  return (
    <div >
      <Paged
        videogames={videogames.length}
        gamePerPage={gamePerPage}
        paged={paged}
      />
      <SearchBar
        setCurrentPage={setCurrentPage}
      />
      <GenresSelect
        genres={genres}
      />
      <AscDescNameAndRating
        setCurrentPage={setCurrentPage}
        orderBy={orderBy}
      />
      <ButtonToForm/>
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