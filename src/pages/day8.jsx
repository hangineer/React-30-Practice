import { useState, useRef } from "react";


function Day8() {
  const fiveMinutes = new Date(0, 0, 0, 0, 0, 10);
  const [remainingTime, setRemainingTime] = useState(fiveMinutes);
  const [isRunning, setIsRunning] = useState(false);
  const formattedTime = Intl.DateTimeFormat("en-US", {
    minute: "2-digit",
    second: "2-digit",
  }).format(remainingTime);

  const timerRef = useRef(null);

  console.log("formattedTime", formattedTime);
  console.log("remainingTime", remainingTime);


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
          handleReset(); // 時間倒數完畢，重置
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
    setRemainingTime(fiveMinutes);
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
