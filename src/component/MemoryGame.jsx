function MemoryGame({ images }) {

  return (
    <div className="grid grid-cols-4 gap-4">
      {images.map((img, idx) => (
        <img className="aspect-square object-cover" key={idx} src={img} alt="" />
      ))}
    </div>
  )

}

export default MemoryGame;