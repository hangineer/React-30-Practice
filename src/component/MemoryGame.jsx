import { useState } from "react";

function MemoryGame({ images }) {

  const [foundImages, setFoundImages] = useState({})
  const [flippedIdx, setFlippedIdx] = useState(null);

  const isImageVisible = (idx) => {
    if (foundImages[idx]) return true;
    if (idx === flippedIdx)return true;
    return false;
  };

  const handleFlipped = (idx) => {
    if (images[flippedIdx] === images[idx]) {
      setFoundImages({
        ...foundImages,
        [idx]: true,
        [flippedIdx]: true
      });
    }
    setFlippedIdx(idx);

    // console.log("foundImages", foundImages);
    // console.log("flippedIdx", flippedIdx);
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map((img, idx) => (
        isImageVisible(idx)
          ? (<img className="aspect-square object-cover w-45" key={idx} src={img}  alt="" />)
          : (<div
              className="aspect-square w-45 bg-gray-400"
              key={idx}
              onClick={() => handleFlipped(idx)} />
            )
      ))}
    </div>
  )

};

export default MemoryGame;