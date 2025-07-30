import React from 'react';

function ProductCard({
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
  return (
    <div className={`cursor-pointer ${className}`}>

      {/* Image Section */}
      <div className={`${imageClass}`}>
        <img src={image} alt="Product" className="object-cover" />
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
