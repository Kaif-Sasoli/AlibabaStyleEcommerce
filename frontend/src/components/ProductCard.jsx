import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({
  id,
  image,
  title,
  price,
  className = '',
  imageClass = '',
  order = 'title-first',
  titleClass = '',
  priceClass = '',
  infoClass = ''
}) {

  const navigate = useNavigate()

  return (
    <div 
    onClick={() =>  navigate(`/product/${id}`)}
    className={`cursor-pointer ${className}`}>

      {/* Image Section */}
      <div className={`${imageClass}`}>
        <img src={image} alt="Product" className="w-full h-full object-cover" />
      </div>

      {/* Info Section */}
      <div className={`${infoClass}`}>
        {order === 'title-first' ? (
          <>
            <h1 className={`${titleClass}`}>{title}</h1>
            <h1 className={`${priceClass}`}>${price}</h1>
          </>
        ) : (
          <>
            <h1 className={`${priceClass}`}>${price}</h1>
            <h1 className={`${titleClass}`}>{title}</h1>
          </>
        )}
        
      </div>
    </div>
  );
}

export default ProductCard;
