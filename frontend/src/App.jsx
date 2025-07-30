import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import AuthLayout from './components/auth/AuthLayout'

import Home from './pages/Home'
import SearchResultsPage from './pages/SearchResultsPage'
import ProductDetail from './pages/ProductDetails'
import Cart from './pages/Cart'
import SignIn from './components/auth/SignIn'
import AccountType from './components/auth/AccountType'
import BuyerSignUp from './components/auth/BuyerSignUp'
import SupplierSignUp from './components/auth/SupplierSignUp'
import VerifyEmail from './components/auth/VerfiyEmail'

function App() {
  

  return (
    <Router>
      <Routes>

         {/* Main Layout Routes */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/search' element={<SearchResultsPage/>} />
          <Route path='/product' element={<ProductDetail/>} />
          <Route path='/cart' element={<Cart/>}/>
        </Route>

        {/* Auth Layout Routes */}
        <Route element={<AuthLayout/>}>
          <Route path='/signin' element={<SignIn/>} /> 
          <Route path='accounttype' element={<AccountType/>} />
          <Route path='/buyersignup' element={<BuyerSignUp/>} />
          <Route path='/suppliersignup' element={<SupplierSignUp/>} />
          <Route path='/verifyemail' element={<VerifyEmail/>} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
