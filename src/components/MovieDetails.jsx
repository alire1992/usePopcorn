/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

const KEY = "705b7876";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isWatched = watched?.map((m) => m.imdbID).includes(selectedId);
  const userRate = watched?.find((m) => m.imdbID === selectedId)?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
  }

  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        if (!response.ok) throw new Error("something went wrong!");
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err);
      }
    }
    getMovie();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `MOVIE | ${title}`;

    return () => {
      document.title = "usePopcorns";
    };
  }, [title]);

  return (
    <div className="details">
      {error && <ErrorMessage message={error} />}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating onSetRating={setUserRating} />
                  {userRating > 0 ? (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  ) : null}
                </>
              ) : (
                <p>
                  You rated this movie <span>{`${userRate}⭐`}</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
