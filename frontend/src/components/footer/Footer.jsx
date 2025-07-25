import React from 'react'
import TopFooter from './TopFooter'
import BottomFooter from './BottomFooter'

function Footer() {
  return (
    <footer 
     className='py-2' >
      <TopFooter/>
      <BottomFooter/>
    </footer>
  )
}

export default Footer