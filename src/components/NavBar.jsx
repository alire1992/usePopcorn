import Logo from "./Logo";
import NumResult from "./NumResult";
import Search from "./Search";

function NavBar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResult />
    </nav>
  );
}

export default NavBar;
