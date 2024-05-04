import { useEffect, useState } from "react";

import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import NumResult from "./components/NumResult";
import Search from "./components/Search";
import Main from "./components/Main";
import Box from "./components/Box";
import Summary from "./components/Summary";
import MovieList from "./components/MovieList";
import Loader from "./components/Loader";

const KEY = "705b7876";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=evil`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data?.Search);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResult numOfResault={movies?.length} />
      </NavBar>
      <Main>
        <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>

        <Box>
          <>
            <Summary watched={watched} />
            <MovieList movies={watched} />
          </>
        </Box>
      </Main>
    </>
  );
}
