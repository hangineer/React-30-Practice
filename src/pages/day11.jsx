import { useState, useEffect } from "react";

function Day11() {
  const [text, setText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [fullText, setFullText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isTyping || !fullText) return;

    setDisplayText("");

    let index = 0;

    const intervalId = setInterval(() => {
      // 已經顯示所有字，就清除定時器
      if (index >= fullText.length) {
        clearInterval(intervalId);
        setIsTyping(false);
        return;
      }

      const nextChar = fullText[index];
      if (nextChar) {
        setDisplayText(prev => prev + nextChar);
      }
      index++;
    }, 200);

    return () => clearInterval(intervalId);
  }, [fullText, isTyping]);

  const handleClick = () => {
    if (!text.trim()) return; // 如果去除空白後為空，則不執行
    setFullText(text);
    setIsTyping(true);
  };

  return (
    <>
      <h2 className="text-2xl">Day 11: Build a Typewriter effect component</h2>
      <a href="https://reactpractice.dev/exercise/build-a-typewriter-effect-component/?utm_source=calendar.reactpractice.dev&utm_medium=social&utm_campaign=calendar-v1">
        題目連結
      </a>
      <div className="flex gap-2 my-2 items-center justify-center">
        <label>

          <input className="input" type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <button
          className="btn btn-primary"
          onClick={handleClick}
          disabled={isTyping || !text.trim()}
        >
          {isTyping ? "打字中..." : "顯示打字效果"}
        </button>
      </div>

      <div className="p-4 bg-base-200 rounded mt-4 min-h-16">
        <div className="text-lg">
          {displayText}
          {isTyping && <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></span>}
        </div>
      </div>
    </>
  );
};

export default Day11;
