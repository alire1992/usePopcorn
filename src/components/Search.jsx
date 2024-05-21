/* eslint-disable react/prop-types */

import { useRef } from "react";
import { useKey } from "../hooks/useKey";

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

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
