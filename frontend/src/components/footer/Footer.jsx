import React from 'react'
import TopFooter from './TopFooter'
import BottomFooter from './BottomFooter'
import NewsLetter from './NewsLetter'
import { useLocation } from 'react-router-dom'

function Footer({ className = '' }) {
  
  const hiddenPaths = ['/signin', '/buyerlogin', '/supplierlogin']
  const shouldHideNewsletter = hiddenPaths.includes(location.pathname)

  return (
     <footer className={`${className}`}>
      {!shouldHideNewsletter && <NewsLetter />}
      <TopFooter />
      <BottomFooter />
    </footer>
  )
}

export default Footer