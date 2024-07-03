import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import "../LandingPage/LandingPage.css"

function Navigation() {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/portfolios/">Portfolio</NavLink>
        </li>
        <li>
          <NavLink to="/watchlists">Watchlist</NavLink>
        </li>
        <li>
          <NavLink to="/stocks">Compare Stocks</NavLink>
        </li>
        <li>
          <NavLink to="/research">Research</NavLink>
        </li>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
