import { Link } from "react-router";
const totalDays = 30;

function PracticeList() {
  return (
    <>
      <ul className="columns-3 gap-4 space-y-2 mt-3">
        {Array.from({ length: totalDays }, (_, idx) => (
          <li key={idx}>
            <Link to={`/day${idx + 1}`}>Day{idx + 1}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
export default PracticeList;
