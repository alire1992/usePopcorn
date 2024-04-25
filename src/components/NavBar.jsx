import NumResult from "./NumResult";
import Search from "./Search";

function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <Search />
      <NumResult />
    </nav>
  );
}

export default NavBar;
