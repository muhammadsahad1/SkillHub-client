
import { Navigate } from "react-router-dom";
import useGetUser from "../../hook/getUser";

const ProtectedRoute = ({ children } : any) => {
const user = useGetUser()

  
  if (user.id) {
    return <Navigate to="/admin/dashboard" replace />; // Redirect to dashboard if logged in
  }

  return children; // Render login page if user is not logged in
};

export default ProtectedRoute;