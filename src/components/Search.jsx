/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
    function callback(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      ref={inputEl}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
