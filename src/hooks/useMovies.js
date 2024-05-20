import { useEffect, useState } from "react";

const KEY = "705b7876";

export function useMovies(query, callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
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

    callback?.();
    fetchMovie();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
