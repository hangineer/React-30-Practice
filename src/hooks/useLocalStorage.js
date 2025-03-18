import { useState, useEffect } from "react";

function useLocalStorage(key, initVal) {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)) || initVal);

  // const handleValueChange = (updateVal) => {
  //   localStorage.setItem(key, JSON.stringify(updateVal));
  //   setValue(updateVal);
  // }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value])

  return [value, setValue];
}

export default useLocalStorage;