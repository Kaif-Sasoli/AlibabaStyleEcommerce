import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import DashboardSidebar from './components/sidebar/DashboardSidebar'

function Layout() {

   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
   const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
   const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div>
        <Header onSidebarToggle={toggleSidebar} />

        <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
      />
      
        <main>
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout