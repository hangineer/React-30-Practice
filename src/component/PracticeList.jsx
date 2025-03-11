import { Link } from "react-router";

function PracticeList() {
  return (
    <>
      <ul>
        <li>
          <Link to="/day1">Day1</Link>
        </li>
        <li>
          <Link to="/day2">Day2</Link>
        </li>
      </ul>
    </>
  );
}
export default PracticeList;
