import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import "../LandingPage/LandingPage.css"
import tradewiseImage from '../../../../images/tradewise.png'


function Navigation() {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink to="/">
          <img src={tradewiseImage} alt="Home" className="nav-icon" />
          </NavLink>
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
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
