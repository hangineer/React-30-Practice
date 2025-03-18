import { createBrowserRouter } from "react-router";
import App from "@/App";
import Day1 from "@/pages/day1";
import Day2 from "@/pages/day2";
import Day3 from "@/pages/day3";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "day1",
    element: <Day1 />,
  },
  {
    path: "day2",
    element: <Day2 />,
  },
  {
    path: "day3",
    element: <Day3 />,
  },
];

const router = createBrowserRouter(routes);

export default router;
