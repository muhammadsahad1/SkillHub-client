import useGetUser from "../hook/getUser"

const Viewprofile : React.FC = () => {

const currentUser = useGetUser()
  return (
    <div>
      <img src={currentUser.profileImage}/>
    </div>
  )
}

export default Viewprofile 
