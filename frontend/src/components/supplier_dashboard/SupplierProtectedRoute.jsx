import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSupplierProfile } from '../../store/authSlice';

const SupplierProtectedRoute = ({ children }) => {

  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  const supplier = useSelector(state => state.auth.supplier);
  
  // Fetch Profile
    useEffect(() => {
    if(!supplier){
      const fetchProfile = async () => {
    await dispatch(getSupplierProfile());
    };
    fetchProfile();
    }
}, [dispatch]);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default SupplierProtectedRoute;
