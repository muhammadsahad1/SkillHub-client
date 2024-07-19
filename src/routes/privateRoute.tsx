import useGetUser from "../hook/getUser";
import { Outlet , Navigate } from "react-router-dom";

const privateRoute :React.FC = ()  => {
  const currentUser = useGetUser()
  currentUser.profile ? <Outlet/> : <Navigate to='/' replace/>
}

export default privateRoute
