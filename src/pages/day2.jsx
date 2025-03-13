import { useState } from "react";
import Accordion from "@/component/Accordion.jsx";

const items = [
  {
    title: "What is Github and how does it work?",
    content:
      "GitHub is the home for all developers—a platform where you can share code, contribute to open source projects, or even automate your workflow with tools like GitHub Actions and Packages. If you’re just getting started with GitHub, you may know us best as a place for version control and collaboration.",
  },
  {
    title: "How do I see GitHub's availability?",
    content: "Check our real-time status report",
  },
  {
    title: "Why is GitHub so popular?",
    content:
      "GitHub is built by developers for developers, and we’re proud to be home to the world’s largest open source community. With 50 million developers and millions more open source projects, GitHub has become the go-to place to collaborate and build software together.",
  },
];


function Day2() {
  const [expendIdx, setExpendIdx] = useState(null); // useState is asynchronous

  return (
    <>
      <h2 className="text-2xl">Day 2: Build an Accordion component</h2>
      <a href="https://reactpractice.dev/exercise/build-an-accordion-component/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>
      <div>
        {
          items.map((item, idx) => (
            <Accordion
              key={item.title}
              title={item.title}
              isOpen={expendIdx === idx}
              // Updater Function
              onToggle={() => setExpendIdx((pre) => (pre === idx ? null : idx))} // Only allow one item at a time to be expanded
            >
              {item.content}
            </Accordion>
          ))
        }

      </div>
    </>
  );
}

export default Day2;
