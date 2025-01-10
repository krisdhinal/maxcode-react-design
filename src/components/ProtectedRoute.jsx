import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // Redirect to login if token is not available
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
