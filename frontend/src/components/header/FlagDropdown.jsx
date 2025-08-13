import React, { useState, useEffect, useRef } from "react";

export default function FlagDropdown({ countries, onChange, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) =>
      dropdownRef.current && !dropdownRef.current.contains(e.target) && setIsOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = countries.find((c) => c.name === value);

  return (
    <div ref={dropdownRef} className="relative w-16">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white cursor-pointer"
      >
        {selected ? (
          <img src={selected.flag} alt={selected.name} className="w-5 h-4 object-cover" />
        ) : (
          <span>Select country</span>
        )}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 26 26">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-40 right-0 overflow-auto rounded border
         bg-white shadow-lg">
          {countries.map(({ name, flag }) => (
            <li
              key={name}
              onClick={() => {
                onChange(name);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <img src={flag} alt={name} className="w-5 h-4 object-cover" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
