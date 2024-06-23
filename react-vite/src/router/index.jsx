import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import StockList from '../components/StockList/StockList';

const symbols = ['AAPL', 'GOOGL', 'MSFT'];

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <StockList symbols={symbols} listType="portfolio" />,
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
        element: <StockList symbols={symbols} listType="portfolio" />,
      },
      {
        path: "watchlists",
        element: <StockList symbols={symbols} listType="watchlist" />,
      },
    ],
  },
]);
