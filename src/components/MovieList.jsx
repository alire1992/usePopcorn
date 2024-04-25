/* eslint-disable react/prop-types */

import MovieItem from "./MovieItem";

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
