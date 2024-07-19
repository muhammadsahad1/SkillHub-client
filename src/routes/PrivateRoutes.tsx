import { ReactNode } from "react"
import useGetUser from "../hook/getUser"
import { Navigate } from "react-router-dom"

interface PrivateRoutesProps {
  children : ReactNode
}

const PrivateRoutes : React.FC<PrivateRoutesProps> = ({ children }) => {

  const currentUser = useGetUser()

    if(!currentUser){
      return <Navigate to='/userLogin'/>
     }
  
     return children
}

export default PrivateRoutes
