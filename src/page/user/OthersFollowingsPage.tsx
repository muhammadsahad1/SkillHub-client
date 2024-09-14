import NavBar from '../../components/common/navBar'
import OtherProfileFollowings from '../../components/user/OtherProfileFollowing'
import { useParams } from 'react-router-dom'

const OthersFollowingsPage = () => {

  const { userId } = useParams()
  return (
    <div>
      <NavBar/>
      <OtherProfileFollowings userId={userId}/>
    </div>
  )
}

export default OthersFollowingsPage
