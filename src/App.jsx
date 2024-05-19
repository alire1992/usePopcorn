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
import MovieDetails from "./components/MovieDetails";
import WatchedMoviesList from "./components/WatchedMoviesList";

const KEY = "705b7876";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem("watched"))
  );
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) =>
      watched.filter((m) => (m.imdbID !== id ? m : null))
    );
    // localStorage.setItem(
    //   "watched",
    //   JSON.stringify(watched.filter((m) => (m.imdbID !== id ? m : null)))
    // );
  }

  // better and shorter
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

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
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error("something went wrong!");
        }
        const data = await response.json();
        setMovies(data.Search);
        if (data.Response === "False") throw new Error("Movie not found!");
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie();
    fetchMovie();

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const closeDetail = (e) => {
      if (e.key === "Escape") {
        handleCloseMovie();
      }
    };
    document.body.addEventListener("keydown", closeDetail);

    return function () {
      document.body.removeEventListener("keydown", closeDetail);
    };
  }, []);

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
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
