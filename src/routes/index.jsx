import { createBrowserRouter } from "react-router";
import App from "@/App";
import Day1 from "@/pages/day1";
import Day2 from "@/pages/day2";
import Day3 from "@/pages/day3";
import Day4 from "@/pages/day4";
import Day5 from "@/pages/day5";
import Day6 from "@/pages/day6";
import Day7 from "@/pages/day7";
import Day8 from "@/pages/day8";
import Day9 from "@/pages/day9";
import Day10 from "@/pages/day10";
import Day11 from "@/pages/day11";
import Day12 from "@/pages/day12";
import Day13 from "@/pages/day13";

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
  {
    path: "day5",
    element: <Day5 />,
  },
  {
    path: "day6",
    element: <Day6 />,
  },
  {
    path: "day7",
    element: <Day7 />,
  },
  {
    path: "day8",
    element: <Day8 />,
  },
  {
    path: "day9",
    element: <Day9 />,
  },
  {
    path: "day10",
    element: <Day10 />,
  },
  {
    path: "day11",
    element: <Day11 />,
  },
  {
    path: "day12",
    element: <Day12 />,
  },
  {
    path: "day13",
    element: <Day13 />,
  },
];

const router = createBrowserRouter(routes);

export default router;
