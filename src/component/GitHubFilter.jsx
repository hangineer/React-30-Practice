import { useState, useRef, useEffect } from "react";

const Filter = ({
  title,
  items = [],
  selectedItems = [],
  onSelectionChange,
  placeholder = "Search",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, searchTerm]);

  // 點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleItem = (item) => {
    const isSelected = selectedItems.some(
      (selected) => selected.id === item.id
    );
    let newSelection;

    if (isSelected) {
      newSelection = selectedItems.filter(
        (selected) => selected.id !== item.id
      );
    } else {
      newSelection = [...selectedItems, item];
    }

    onSelectionChange(newSelection);
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const getDisplayText = () => {
    if (selectedItems.length === 0) {
      return title;
    }
    return selectedItems.map((item) => item.name).join(", ");
  };

  return (
    <div className="relative w-full max-w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <span
          className={`${selectedItems.length > 0 ? "text-gray-900" : "text-gray-500"} truncate`}
        >
          {getDisplayText()}
        </span>
        {/* arrow down */}
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                No items found
              </div>
            ) : (
              <>
                {selectedItems.length > 0 && (
                  <div className="px-3 py-1">
                    <button
                      onClick={clearSelection}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Clear Selection
                    </button>
                  </div>
                )}
                {filteredItems.map((item) => {
                  const isSelected = selectedItems.some(
                    (selected) => selected.id === item.id
                  );
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item)}
                      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        isSelected
                          ? "bg-blue-50 text-blue-900"
                          : "text-gray-900"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 mr-2 border rounded ${
                            isSelected
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {/* arrow up */}
                          {isSelected && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>

                        {/* authors */}
                        {item.avatar_url ? (
                          <div className="flex items-center space-x-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.avatar_url}
                              alt={item.name}
                            />

                            <span className="text-sm font-medium">
                              {item.name}
                            </span>
                          </div>
                        ) : (
                          <>
                            <span>{item.name}</span>
                            {item.description && (
                              <span className="ml-2 text-xs text-gray-500">
                                {item.description}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
