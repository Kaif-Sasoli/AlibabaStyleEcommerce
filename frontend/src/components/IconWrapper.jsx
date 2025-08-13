import React from 'react'

function IconWrapper({
        Icon,
        className='',
        iconClassName='',
        href, 
        ...props
        
      }) {
  return href ? (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      <Icon className={iconClassName} />
    </a>
  ) : (
    <div className={className}>
      <Icon className={iconClassName} />
    </div>
  )
}

export default IconWrapper