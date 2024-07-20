import { useEffect } from "react"
import { useLocation } from "react-router-dom"


const ResetPassword = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const resetToken = query.get('resetToken')

  useEffect(()=>{
    
  },[resetToken])
  return (
    <div className="w-full" >
      <h1>ResetPassword</h1>
    </div>
  )
}

export default ResetPassword
