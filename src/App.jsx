import { useEffect, useState } from "react";

import { useMovies } from "./hooks/useMovies";

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

export default function App() {
  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem("watched"))
  );
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

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
