import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import { ToastContainer } from 'react-toastify'
import { getSupplierProfile, getBuyerProfile } from './store/authSlice';
import 'react-toastify/dist/ReactToastify.css'

import AuthLayout from './components/auth/AuthLayout'

import Home from './pages/Home'
import SearchResultsPage from './pages/SearchResultsPage'
import ProductDetail from './pages/ProductDetails'
import Cart from './pages/Cart'
import SignIn from './pages/auth/SignIn'
import AccountType from './pages/auth/AccountType'
import SignUp from './pages/auth/SignUp'
import VerifyEmail from './pages/auth/VerfiyEmail'
import SupplierDashboardLayout from './components/supplier_dashboard/SupplierDashboardLayout'
import SupplierDashboard from './pages/supplier/SupplierDashboard'
import EditProfile from './components/EditProfile'
import Profile from './pages/supplier/Profile'
import Products from './pages/supplier/Products'
import BuyerDashboardLayout from './components/buyer_dashboard/BuyerDashboardLayout'
import BuyerDashboard from './pages/buyer/BuyerDashboard'
import BuyerProtectedRoute from './components/buyer_dashboard/BuyerProtectedRoute'
import SupplierProtectedRoute from './components/supplier_dashboard/SupplierProtectedRoute'
import CartProtectedRoute from './components/CartProtectedRoute'
import Order from './pages/supplier/Order'
import Shipping from './pages/supplier/Shipping'
import Payment from './pages/supplier/Payment'
import Settings from './pages/supplier/Settings'
import AddProduct from './pages/supplier/AddProduct'
// this is app

function App() {

  const dispatch = useDispatch();
   useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      if (role === 'supplier') {
        dispatch(getSupplierProfile());
      } else if (role === 'buyer') {
        dispatch(getBuyerProfile());
      }
    }
  }, [dispatch]);

  
  return (
    <>
    <Router>
      <Routes>

         {/* Main Layout Routes */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/search' element={<SearchResultsPage/>} />
          <Route path='/product/:productId' element={<ProductDetail/>} />
          <Route
            path='/cart'
            element={
              <CartProtectedRoute>
                <Cart />
              </CartProtectedRoute>
            }
          />
         
        </Route>

        {/* Auth Layout Routes */}
        <Route element={<AuthLayout/>}>
          <Route path='/signin' element={<SignIn/>} /> 
          <Route path='accounttype' element={<AccountType/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/verifyemail' element={<VerifyEmail/>} />
        </Route>

        {/* Supplier Dashboard Routes */}
        <Route  path="/supplier" element={
          <SupplierProtectedRoute>
          <SupplierDashboardLayout/>
          </SupplierProtectedRoute>
          }>
            <Route path='dashboard'  element={<SupplierDashboard/>}/>
             <Route path='orders' element={<Order/>} />
             <Route path='shipping' element={<Shipping/>} />
             <Route path='payment' element={<Payment/>}/>
             <Route path='settings' element={<Settings/>} />
             <Route path='edit' element={<EditProfile/>} />
             <Route path='profile' element={<Profile/>}/>
             <Route path='products' element={<Products/>} />
             <Route path='add-product' element={<AddProduct/>}/>
        </Route>

        {/* Buyer Dashboard Routes */}
        <Route path='/buyer' element={
          <BuyerProtectedRoute>
          <BuyerDashboardLayout/>
          </BuyerProtectedRoute>
          }>
           <Route path='dashboard' element={<BuyerDashboard/>} />
        </Route>

      </Routes>
    </Router>

    {/* Toaster Contaner */}
     <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
