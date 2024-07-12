import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import StockDetail from '../components/StockDetails/StockDetail';
import StockDetails from '../components/StockDetails/StockDetails';
import StockDetailsVs from '../components/StockDetails/StockDetailsVs';
import Portfolio from '../components/Portfolios/Portfolios';
import Watchlist from '../components/Watchlists/Watchlists';
import LandingPage from '../components/LandingPage/LandingPage';
import Dashboard from '../components/Dashboard/Dashboard';
import ResearchPage from '../components/Research/ResearchPage';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "research",
        element: <ResearchPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "stocks",
        element: <StockDetailsVs />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "portfolios",
        element: <Portfolio />,
      },
      {
        path: "watchlists",
        element: <Watchlist />,
      }
    ],
  },
]);
