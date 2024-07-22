import { useEffect } from "react"
import useGetUser from "../hook/getUser"
import { profileImage } from "../API/user"
import { current } from "@reduxjs/toolkit"
import { setProfileImage, setUser } from "../redux/userSlices"
import { useDispatch } from "react-redux"

const Viewprofile : React.FC = () => {
  const currentUser = useGetUser()
  const dispatch = useDispatch()
  
  const fetchProfileImage = async () => {
    if(currentUser?.id){
      try {
        const response = await profileImage(currentUser.id)
        dispatch(setProfileImage(response.imageUrl))
        console.log("res ===>",response)
      } catch (error) {
        
      }
    }
}

useEffect(()=>{
  fetchProfileImage()
},[])

console.log("profile key ===> ",currentUser.picture)

  return (
    
    <div className="min-h-screen  flex justify-center">
      <div className="my-8 mx-8 ">
      {currentUser.picture ? (
          <img
            src={currentUser.picture}
            alt={`${currentUser.name}'s profile`}
            className="w-32 h-32 object-cover rounded-full"
          />
        ) : (
          <div>No profile image</div>
        )}
      </div>
    </div>
  )
}
  
export default Viewprofile 
