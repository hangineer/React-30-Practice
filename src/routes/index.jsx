import { createBrowserRouter } from "react-router";
import App from "@/App";
import Day1 from "@/pages/day1";
import Day2 from "@/pages/day2";
import Day3 from "@/pages/day3";
import Day4 from "@/pages/day4";

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
  {
    path: "day4",
    element: <Day4 />,
  },
];

const router = createBrowserRouter(routes);

export default router;
