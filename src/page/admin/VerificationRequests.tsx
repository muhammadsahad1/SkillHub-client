
import VerificationRequests from "../../components/admin/verificationRequest/VerificationRequests";
import SideBar from "../../components/admin/layouts/SideBar";


const VerificationRequestsPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SideBar />
      <div className="ml-auto w-full md:w-5/6 p-4">
        <VerificationRequests />
      </div>
    </div>
  );
};

export default VerificationRequestsPage;
