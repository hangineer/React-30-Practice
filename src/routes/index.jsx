import { createBrowserRouter } from 'react-router';
import App from "@/App";
import Day1 from '@/pages/day1';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'day1',
    element: <Day1 />,
  }
];

const router = createBrowserRouter(routes);

export default router;