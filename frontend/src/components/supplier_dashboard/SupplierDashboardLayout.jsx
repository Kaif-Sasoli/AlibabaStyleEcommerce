import React, { useState } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import DashboardSidebar from '../sidebar/DashboardSidebar'
import { MdDashboard } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { FaTruck } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { GoContainer } from "react-icons/go";
import { FaUser } from "react-icons/fa";

function SupplierDashboardLayout() {

  const items = [
        { label: 'Dashboard', path: '/supplier/dashboard', icon: MdDashboard },
        { label: 'Orders', path: '/supplier/orders', icon: IoMdCart },
        { label: 'Products', path: '/supplier/products', icon: MdShoppingBag },
        { label: 'Shipping', path: '/supplier/shipping', icon: FaTruck },
        { label: 'Payment', path: '/supplier/payment', icon: MdPayment },
        { label: 'Proflile', path: '/supplier/profile', icon: FaUser },
        { label: 'Settings', path: '/supplier/settings', icon: FaGear },
      ];
      
      const location = useLocation();
      const [isSidebarOpened, setIsSidebarOpened] = useState(true)
      const activeItemObj = items.find((item) => location.pathname.startsWith(item.path));
      const activeItem = activeItemObj?.label || '';


  return (
    <div className='flex'>
       
           {/* Sidebar */}
          <DashboardSidebar 
          items={items} 
          activeItem={activeItem} 
          isSidebarOpened={isSidebarOpened}
          setIsSidebarOpened={setIsSidebarOpened} />
          
          {/* Main */}
          <main 
          className={`bg-backgroundGray transition-all duration-300 ease-in-out`}
            style={{
            marginLeft: isSidebarOpened ? '16rem' : '3.5rem',
            width: isSidebarOpened ? 'calc(100% - 10rem)' : 'calc(100% - 3.5rem)',
          }}>
             {/* Header */}
             <Header
             title={activeItem}
            className={`transition-all duration-300 ${
            isSidebarOpened ? ' w-[calc(100%-15rem)]' : 'ml-0 w-[calc(100%-3.5rem)]'}`} />
            <Outlet/>
          </main>
    </div>
  )
}

export default SupplierDashboardLayout