import { useState, useRef } from "react";

function Day8() {
  const initialTime = new Date(0, 0, 0, 0, 0, 15);
  const [remainingTime, setRemainingTime] = useState(initialTime); // useState 是為了讓定時器可以隨著時間變化，每次渲染都會重新計算
  const [isRunning, setIsRunning] = useState(false);
  const formattedTime = Intl.DateTimeFormat("en-US", {
    minute: "2-digit",
    second: "2-digit",
  }).format(remainingTime);

  // 使用 useRef 的原因是定時器 ID 需在多次渲染間保持不變
  const timerRef = useRef(null);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        const currentTime = new Date(prev.getTime() - 1000);
        const minute = currentTime.getMinutes();
        const second = currentTime.getSeconds();

        if (!minute && !second) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          handleReset(); // 時間倒數完 -> 重置
        }
        return currentTime;
      });
    }, 1000);
  }

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  }

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setRemainingTime(initialTime);
  }

  return (
    <>
      <h2 className="text-2xl">Day 8: Create a timer that can be started and stopped</h2>
      <a href="https://reactpractice.dev/exercise/create-a-timer-that-can-be-started-and-stopped/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>
      <div className="mt-4">
        <h3 className="text-4xl">{formattedTime}</h3>
        <div>{isRunning}</div>
        <div className="flex gap-2">
          <button onClick={handleStart} disabled={isRunning}>Start</button>
          <button onClick={handleStop} disabled={!isRunning}>Stop</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </>
  );
};

export default Day8;
