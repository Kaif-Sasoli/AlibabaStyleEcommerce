import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartProtectedRoute = ({ children }) => {
  const buyer = useSelector((state) => state.auth.buyer);
  const supplier = useSelector((state) => state.auth.supplier);

  if (supplier) {
    toast.error("Suppliers cannot access the cart");
    return <Navigate to="/" replace />;
  }

  if (!buyer) {
    toast.error("Please login as a buyer to access the cart");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CartProtectedRoute;
