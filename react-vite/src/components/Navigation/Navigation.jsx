import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">NEW</NavLink>
      </li>
      <li>
        <NavLink to="/portfolios">Portfolio</NavLink>
      </li>
      <li>
        <NavLink to="/watchlists">Watchlist</NavLink>
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
