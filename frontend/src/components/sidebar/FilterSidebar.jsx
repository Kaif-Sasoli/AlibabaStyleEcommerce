import React, { useState } from 'react';
import { FaAngleDown, FaChevronUp } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { Link } from 'react-router-dom'; 

// Dummy backend-like structure
const filterOptions = [
  {
    id: 'category',
    title: 'Category',
    type: 'checkbox',
    options: ['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech']
  },
  {
    id: 'brand',
    title: 'Brands',
    type: 'checkbox',
    options: ['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo']
  },
  {
    id: 'features',
    title: 'Features',
    type: 'checkbox',
    options: ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory']
  },
  {
    id: 'condition',
    title: 'Condition',
    type: 'radio',
    options: ['Any', 'Refurbished', 'Brand new', 'Old items']
  }
];

function FilterSidebar({className='', onFilterChange }) {


  const [openSections, setOpenSections] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    brand: [],
    features: [],
    condition: 'Any',
    priceRange: { min: '', max: '' },
     ratings: [],
  });

  const toggleSection = (id) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckbox = (section, option) => {
    
    setSelectedFilters(prev => {
      const alreadySelected = prev[section].includes(option);
      const updated = alreadySelected
        ? prev[section].filter(item => item !== option)
        : [...prev[section], option];

      const newFilters = { ...prev, [section]: updated };
      onFilterChange?.(newFilters); // Send data to parent/backend
      return newFilters;
    });
  };

  const handleRadio = (section, option) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev, [section]: option };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters(prev => {
      const newFilters = {
        ...prev,
        priceRange: {
          ...prev.priceRange,
          [name]: value
        }
      };
      return newFilters;
    });
  };

  const applyPrice = () => {
    onFilterChange?.(selectedFilters);
  };

  return (
    <div className={`px-2 md:p-0 ${className}`}>

      {filterOptions.map((section) => (
        <div key={section.id} className=''>
         
          <div
            className='flex justify-between items-center cursor-pointer transition-all
            border-t-[1px] py-1.5 border-gray-200 '
            onClick={() => toggleSection(section.id)}
          >
            <h4 className="text-sm md:text-base font-semibold py-1">{section.title}</h4>
            <span>{openSections[section.id] ? <FaChevronUp  className='text-sm'/> : 
                                               <FaAngleDown className='text-sm'/>}</span>
          </div>

          <ul
            className={`transition-all ease-in-out overflow-hidden
              ${openSections[section.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {/* Section Options */}
            {section.options.map((option, idx) => (
            <li key={idx} className="text-sm text-textcolor py-1 flex items-center gap-2">
              {section.id === 'category' ? (
                <Link
                  to={`/category/${option.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-blue-500"
                >
                  {option}
                </Link>
              ) : section.type === 'checkbox' ? (
                <>
                  <input
                    type="checkbox"
                    checked={selectedFilters[section.id]?.includes(option)}
                    onChange={() => handleCheckbox(section.id, option)}
                  />
                  <label>{option}</label>
                </>
              ) : section.type === 'radio' ? (
                <>
                  <input
                    type="radio"
                    name={section.id}
                    value={option}
                    checked={selectedFilters[section.id] === option}
                    onChange={() => handleRadio(section.id, option)}
                  />
                  <label>{option}</label>
                </>
              ) : null}
            </li>
          ))}
            <button className='text-sm text-blue-500 my-1'>See all</button>
          </ul>
        </div>
      ))}

      {/* PRICE RANGE */}
      <div className=''>
        <div
          className='flex justify-between items-center cursor-pointer
          border-t-[1px] border-gray-200 py-1.5 '
          onClick={() => toggleSection('price')}
        >
          <h4 className="text-sm md:text-base font-semibold">Price range</h4>
          <span>{openSections['price'] ? <FaChevronUp className='text-sm' /> :
                                         <FaAngleDown className='text-sm' />}
          </span>
        </div>

        <div
          className={`transition-all overflow-hidden space-y-2
            ${openSections['price'] ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          
          {/* Dual Range Slider */}
          <div className="relative h-7 flex items-center">
         {/* Full gray track */}
         <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 rounded" />

          {/* Selected range bar (blue line between thumbs) */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1 bg-blue-500 rounded"
            style={{
              left: `${(selectedFilters.priceRange.min / 10000) * 100}%`,
              width: `${((selectedFilters.priceRange.max - selectedFilters.priceRange.min) / 10000) * 100}%`
            }}
          />

          {/* Min slider */}
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={selectedFilters.priceRange.min}
            onChange={(e) =>
              handlePriceChange({ target: { name: 'min', value: e.target.value } })
            }
            className="w-full appearance-none bg-transparent z-20 pointer-events-auto"
          />

          {/* Max slider */}
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={selectedFilters.priceRange.max}
            onChange={(e) =>
              handlePriceChange({ target: { name: 'max', value: e.target.value } })
            }
            className="w-full appearance-none bg-transparent z-30 pointer-events-auto"
          />
        </div>
            
          {/* Numeric Inputs */}
          <div className='flex gap-2'>
            <input
              type="number"
              name="min"
              placeholder='Min'
              min={0}
              max={selectedFilters.priceRange.max}
              className='border border-gray-300 px-2 py-1 w-full text-sm rounded-sm'
              value={selectedFilters.priceRange.min}
              onChange={handlePriceChange}
            />
            <input
              type="number"
              name="max"
              placeholder='Max'
              min={selectedFilters.priceRange.min}
              max={100000}
              className='border border-gray-300 px-2 py-1 w-full text-sm rounded-sm'
              value={selectedFilters.priceRange.max}
              onChange={handlePriceChange}
            />
          </div>
            
          <button
            className='w-full text-sm bg-blue-500 text-white px-3 py-1 mb-3 rounded hover:bg-blue-600'
            onClick={applyPrice}
          >
            Apply
          </button>
        </div>
       </div>

         {/* Ratings */}
        <div className=''>
          <div
            className='flex justify-between items-center cursor-pointer 
            border-t-[1px] border-gray-200 pb-3 py-1.5'
            onClick={() => toggleSection('ratings')}
          >
            <h4 className="text-sm md:text-base font-semibold">Ratings</h4>
            <span>{openSections['ratings'] ? <FaChevronUp className='text-sm' /> : 
                                             <FaAngleDown className='text-sm' />}
            </span>
          </div>

          <div
            className={`transition-all overflow-hidden
              ${openSections['ratings'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {[5, 4, 3, 2].map((rating) => (
              <label key={rating} className="flex items-center gap-2 py-1 text-sm text-textcolor cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-blue-500 "
                  checked={selectedFilters.ratings?.includes(rating)}
                  onChange={() => {
                    setSelectedFilters((prev) => {
                      const existing = prev.ratings || [];
                      const updated = existing.includes(rating)
                        ? existing.filter((r) => r !== rating)
                        : [...existing, rating];
                      const newFilters = { ...prev, ratings: updated };
                      onFilterChange?.(newFilters);
                      return newFilters;
                    });
                  }}
                />
                <div className="flex px-2 text-orange-400">
                  {Array.from({ length: rating }, (_, i) => (
                    <IoIosStar key={i}
                    className='text-xl' />
                  ))}
                  {Array.from({ length: 5 - rating }, (_, i) => (
                    <IoIosStar key={i} className="text-gray-300 text-xl" />
                  ))}
                </div>
              </label>
            ))}
          </div>
        </div>

          </div>
        );
}

export default FilterSidebar;
