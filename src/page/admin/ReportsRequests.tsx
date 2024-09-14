
import PostReports from '../../components/admin/postReports/PostReports'
import SideBar from '../../components/admin/layouts/SideBar'

const ReportsRequests = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
    <div className="lg:w-1/6 lg:fixed lg:h-screen">
      <SideBar />
    </div>
    <div className="w-full lg:w-5/6 lg:ml-[16.67%] p-4">
      <PostReports />
    </div>
  </div>
  )
}

export default ReportsRequests
