import { useRef, useEffect, useState } from 'react'
import TimerBox from './TimerBox'
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function SaleSection({
    title,
    subTitle,
    timer,
    products,
}) {

      const [translated, setTranslated] = useState(false);
      const [containerWidth, setContainerWidth] = useState(0);
      const [translateLeft, setTranslateLeft] = useState(0);
      const containerRef = useRef(null);
      const touchStartX = useRef(0);
      const touchEndX = useRef(0);
      const ITEM_WIDTH = 180; 

      useEffect(() => {
        if (containerRef.current) {
         setContainerWidth(containerRef.current.offsetWidth);
          console.log('Container width:', containerRef.current.offsetWidth);
        }
      
        // Optional: update on window resize
        const handleResize = () => {
          if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
          }
        };
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
      }, []);
      
      // Swipe start
       const handleTouchStart = (e) => {
         touchStartX.current = e.touches[0].clientX;
       };

        // Swipe end
      const handleTouchEnd = () => {
        const delta = touchStartX.current - touchEndX.current;
      
        const totalContentWidth = products.length * ITEM_WIDTH;
        const maxTranslate = Math.max(containerWidth, 0);
      
        if (delta > 50) {
          // Swiped Left
          setTranslateLeft((prev) =>
            Math.min(prev + ITEM_WIDTH, maxTranslate)
          );
        } else if (delta < -50) {
          // Swiped Right
          setTranslateLeft((prev) => Math.max(prev - ITEM_WIDTH, 0));
        }
      };
        // Track finger movement
        const handleTouchMove = (e) => {
          touchEndX.current = e.touches[0].clientX;
        };

      
    
  return (
    <section 
    className='flex flex-col md:flex-row bg-white border-[1px] border-gray-200 md:mt-4
    mt-2'>
        
         <div className='flex lg:flex-col justify-between md:block w-full items-center 
         md:w-1/4 px-4 py-1.5 lg:pt-3 md:pt-5'>
         <div>
            <h1
            className='font-semibold'>{title}</h1>
            <p 
            className='text-sm mb-2 text-gray-300'
            >{subTitle}</p>
          </div>

            <div className='flex items-center gap-1'>
                <TimerBox value={timer.days} label="Days" />
                <TimerBox value={timer.hours} label="Hour" />
                <TimerBox value={timer.minutes} label="Min" />
                <TimerBox value={timer.seconds} label="Sec" />
        </div>
         </div>



        <div className='overflow-hidden'>
        <div 
         ref={containerRef}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
         style={{ transform: `translateX(-${translateLeft}px)` }}
         className={`flex lg:grid grid-cols-5 transform transition-transform duration-500 `}>

           {products && products.map((product, index) => (
              <div className='px-6  border-[1px] border-gray-200 text-center py-3'>
               
               {/* Product Image */}
                <img 
                src={product.image} 
                alt={product.name} 
                className='w-20 lg:w-28 h-20 lg:h-28'
                />
                {/* Product Name */}
                <h1 
                className='pt-2 pb-1 text-sm'>
                    {product.name}
                </h1>
                {/* Discount on Product */}
                <h1 
                className='mx-8 text-sm bg-red-100 text-red-500 rounded-3xl'>
                    -{product.discount}%</h1>
            </div>
           ))}

         </div>
         </div>

         

    </section>
  )
}

export default SaleSection