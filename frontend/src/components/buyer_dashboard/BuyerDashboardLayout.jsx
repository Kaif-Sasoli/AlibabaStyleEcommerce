import React from 'react'
import { Outlet } from 'react-router-dom'

function BuyerDashboardLayout() {
  return (
    <div>
        <h1 className='text-3xl'>Buyer Dashboard</h1>
          <Outlet/>
    </div>
  )
}

export default BuyerDashboardLayout