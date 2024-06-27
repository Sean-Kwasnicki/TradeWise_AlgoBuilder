import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import StockDetails from '../components/StockDetails/StockDetails';
import Portfolio from '../components/Portfolios/Portfolios';
import Watchlist from '../components/Watchlists/Watchlists';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <StockDetails />,
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
