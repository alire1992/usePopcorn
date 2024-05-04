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
import ErrorMessage from "./components/ErrorMessage";

const KEY = "705b7876";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=evil`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setMovies(data?.Search);
    //     setIsLoading(false);
    //     setError("");
    //   })
    //   .catch((e) => {
    //     setIsLoading(false);
    //     setError(e?.message);
    //     throw new Error(e?.message);
    //   });
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!response.ok) throw new Error("something went wrong!");
        const data = await response.json();
        setMovies(data.Search);
        if (data.Response === "False") throw new Error("Movie not found!");
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovie();
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult numOfResault={movies?.length} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} />
          )} */}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList movies={movies} />}
        </Box>

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
