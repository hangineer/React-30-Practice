import { shuffle } from "lodash";

import MemoryGame from "@/component/MemoryGame";

function Day4() {
  const images=[
    "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
    "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
    "https://images.unsplash.com/photo-1520763185298-1b434c919102",
    "https://images.unsplash.com/photo-1442458017215-285b83f65851",
    "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
    "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",

  ];
  const gameImages = shuffle([...images, ...images]);
  return (
    <>
      <h2 className="text-2xl">Day 4: Build a memory game</h2>
      <a href="https://reactpractice.dev/exercise/build-a-memory-game/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>
      <MemoryGame images={gameImages}/>
    </>
  );
}

export default Day4;
