import { useEffect, useState } from "react";
import {
  getVerificationRequests,
  updateRequestStatus,
} from "../../../API/admin";
import { useNotifyUser } from "../../../hook/useNotifyUser";
import useGetUser from "../../../hook/getUser";
import { useSocket } from "../../../hook/useSocket";
import ReusableTable from "../../common/ReusableTable";

const VerificationRequests: React.FC = () => {
  const admin = useGetUser();
  const { socket } = useSocket();
  const [requests, setRequests] = useState<any[]>([]);

  const loadVerificationRequests = async () => {
    try {
      const result = await getVerificationRequests();
      setRequests(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadVerificationRequests();
  }, []);

  const handleAction = async (
    userId: string,
    reqId: string,
    action: string
  ) => {
    try {
      const status = action === "accept" ? "Approved" : "Rejected";
      const message =
        action === "accept"
          ? "Your verification request has been approved."
          : "Your verification request has been rejected.";

      // Update the request status in the local state without calling the API again
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === reqId ? { ...req, status } : req
        )
      );

      // Call the API to update the status in the backend
      await updateRequestStatus(reqId, status);

      // Emit the socket event and notify the user
      const notificationType =
        action === "accept" ? "verifyRequestAccepted" : "verifyRequestRejected";

      socket?.emit("verifyRequest", {
        senderId: admin.id,
        receiverId: userId,
        type: notificationType,
        message,
      });

      await useNotifyUser(admin.id, userId, notificationType, message);
    } catch (error) {
      console.error(error);
    }
  };

  // Define renderActions function here
  const renderActions = (request: any) => {
  
    if (request.status === "Approved") {
      return "No action after approved"; // Don't render the buttons if the request is already approved
    }

    return (
      <>
        <button
          onClick={() => handleAction(request?.userId, request?._id, "accept")}
          className="text-indigo-600 hover:text-indigo-900 mr-2"
        >
          Accept
        </button>
        <button
          onClick={() => handleAction(request?.userId, request._id, "reject")}
          className="text-red-600 hover:text-red-900"
        >
          Reject
        </button>
      </>
    );
  };


  const columns = [
    { Header: "#", accessor: "index" },
    { Header: "Name", accessor: "fullName" },
    { Header: "Email", accessor: "email" },
    { Header: "Status", accessor: "status" },
    { Header: "Due Date", accessor: "createdAt" },
    { Header: "Proof Link", accessor: "proofLink" },
  ];

  const formattedRequests = requests.map((request, index) => ({
    ...request,
    index: `#${index + 1}`,
    createdAt: new Date(request.createdAt).toLocaleDateString(),
    proofLink: (
      <a
        href={request.proofLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View Proof
      </a>
    ),
  }));

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Verification Requests</h1>
      <ReusableTable
        data={formattedRequests}
        columns={columns}
        renderActions={renderActions}
        itemsPerPage={10}
      />
    </div>
  );
};

export default VerificationRequests;
