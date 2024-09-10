import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useGetUser from "../../hook/getUser";

const ProtectedRoute = ({ children } : any) => {
const user = useGetUser() // Adjust based on your Redux state structure

  // Check if the user is logged in or not (replace 'id' with whatever indicates the user is logged in)
  if (user.id) {
    return <Navigate to="/admin/dashboard" replace />; // Redirect to dashboard if logged in
  }

  return children; // Render login page if user is not logged in
};

export default ProtectedRoute;