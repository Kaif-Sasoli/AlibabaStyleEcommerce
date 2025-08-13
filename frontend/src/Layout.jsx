import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Sidebar from './components/sidebar/Sidebar'

function Layout() {

   const [isSidebarOpen, setIsSidebarOpen] = useState(false)
   const toggleSidebar = () => setIsSidebarOpen(prev => !prev)
   const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div>
        <Header onSidebarToggle={toggleSidebar} />

        <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
      />
       {/* mt-[38.5%]  md:mt-[15%] lg:mt-[8.5%] */}
        <main className='pt-36 lg:pt-28 bg-backgroundGray'>
          <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Layout