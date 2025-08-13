import { useRef, useState } from 'react'

function ProductSwipeCarousel ({products}) {

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
        
            if (delta > 50) {
              // Swiped Left
              setTranslateLeft((prev) =>
                Math.min(prev + ITEM_WIDTH, (products.length - 1) * ITEM_WIDTH)
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
        <div className='relative w-full overflow-hidden'>
        <div 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
         style={{ transform: `translateX(-${translateLeft}px)` }}
         className={`flex lg:grid grid-cols-5 transform transition-transform duration-500 
          ${translated ? `translate-l-${translateLeft}` : "translate-x-0"}`}>

           {products && products.map((product, index) => (
                
                <div className='px-6  border-[1px] border-gray-200 text-center py-3'>
                <img 
                src={product.image} 
                alt={product.name} 
                className='w-28 h-28'
                />
                
                <h1 
                className='pt-2 pb-1 text-sm'>
                    {product.name}
                </h1>
                
                <h1 
                className='mx-8 text-sm bg-red-100 text-red-500 rounded-3xl'>
                    -{product.discount}%</h1>
            </div>
           ))}

         </div>
         </div>

  )
}

export default ProductSwipeCarousel 