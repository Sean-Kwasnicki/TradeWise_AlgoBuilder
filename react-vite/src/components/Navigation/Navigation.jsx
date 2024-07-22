import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import "../LandingPage/LandingPage.css"
// import tradewiseImage from '../../../../images/tradewise.png'
import { useSelector } from "react-redux";


function Navigation() {
  const user = useSelector((state) => state.session.user);

  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <NavLink to="/">TradeWise</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/stocks">Compare Stocks</NavLink>
        </li>
        <li>
          <NavLink to="/research">Search</NavLink>
        </li>
        {user && (
          <>
          <li>
            <NavLink to="/portfolios/">Portfolio</NavLink>
          </li>
          <li>
            <NavLink to="/watchlists">Watchlist</NavLink>
          </li>
          </>
        )}
        <li>
            <a href="https://github.com/Sean-Kwasnicki/TradeWise_AlgoBuilder" target="_blank" rel="noopener noreferrer">
                About
            </a>
        </li>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
