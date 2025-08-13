import React, { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

function ProductImageCarousel({ images = [], className = '' }) {
  
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className={`h-full flex flex-col items-center  ${className}`}>

      {/* Main Image with optional arrows on mobile */}
      <div className="relative mb-3 w-full h-[300px] border-gray-200 rounded-md border">
        <img
          src={selectedImage}
          alt="Selected"
          className="w-full h-full rounded-md object-cover"
        />

        {/* Arrows only in mobile */}
        {images.length > 1 && (
          <div className='md:hidden flex gap-3 py-1 px-1 rounded-2xl bg-gray-200 
          absolute transform bottom-2 right-2 bg-opacity-80'>
            <button
              onClick={handlePrev}
              className="text-sm bg-opacity-80 hover:bg-opacity-100 text-white">
              <FaArrowLeftLong />
            </button>
            <button
              onClick={handleNext}
              className="text-sm hover:bg-opacity-100 text-white"> 
            <FaArrowRightLong />
            </button>
          </div>
        )}
      </div>

       <div className="hidden md:flex gap-3 overflow-x-auto">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`border py-0.5 rounded-md cursor-pointer overflow-hidden ${
                selectedIndex === idx ? 'border-gray-800' : 'border-gray-200'
              }`}
              onClick={() => setSelectedIndex(idx)}
              >
              <img
                src={img}
                alt={`Thumbnail ${idx}`}
                className="object-contain rounded w-10 h-10"
              />
            </div>
          ))}
          </div> 

    </div>
  );
}

export default ProductImageCarousel;
