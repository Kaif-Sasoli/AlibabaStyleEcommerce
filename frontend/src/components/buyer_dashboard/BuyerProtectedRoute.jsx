import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBuyerProfile } from '../../store/authSlice';

const BuyerProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  const dispatch = useDispatch();
  const buyer = useSelector(state => state.auth.buyer);
  
  // Fetch Profile
    useEffect(() => {
    if(!buyer){
      const fetchProfile = async () => {
            await dispatch(getBuyerProfile());
    };
    fetchProfile();
    }
}, [dispatch]);


  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default BuyerProtectedRoute;
