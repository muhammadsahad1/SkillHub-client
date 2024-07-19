import { useSelector } from "react-redux";
import { User } from "../@types/allTypes";

 const useGetUser = () => {
  const user = useSelector((state :{user : User} ) => state.user)
  return user
}

export default useGetUser