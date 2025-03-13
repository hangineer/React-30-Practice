import ArrowDown from '@mui/icons-material/KeyboardArrowDown';

function Accordion({ title, isOpen, onToggle, children }) {
  return (
    <div className="border-b max-h-60 max-w-120">
      <div className="flex items-center justify-between">
        <h2 className="inline m-4 cursor-pointer font-bold text-2xl" onClick={onToggle}>{title}</h2>
        <ArrowDown />
      </div>

      <div className={`w-100 transition-all duration-300 ${
          isOpen ? "max-h-100 opacity-100" : "h-0 opacity-0"
        }`}
      >
        {/* can use children to accept the props */}
        {isOpen && <p className="p-4">{children}</p>}
      </div>

    </div>
  )
};

export default Accordion;