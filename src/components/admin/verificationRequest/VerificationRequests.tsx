import React, { useEffect, useState } from "react";
import {
  getVerificationRequests,
  updateRequestStatus,
} from "../../../API/admin";
import { useNotifyUser } from "../../../hook/useNotifyUser";
import useGetUser from "../../../hook/getUser";
import { useSocket } from "../../../hook/useSocket";

const VerificationRequests = () => {
  const admin = useGetUser();
  const { socket } = useSocket();
  const [requests, setRequests] = useState<Request[]>([]);
  console.log("requestsss ==>",requests);

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

      const result = await updateRequestStatus(reqId, status);
      // to creating the notification and senting the notification
      if (status === "Approved") {
        socket?.emit("verifyRequest", {
          senderId: admin.id,
          receiverId: userId,
          type: "verifyRequestAccepted",
          message: message,
        });
        await useNotifyUser(admin.id, userId, "verifyRequestAccepted", message);
      } else {
        socket?.emit("verifyRequest", {
          senderId: admin.id,
          receiverId: userId,
          type: "verifyRequestRejected",
          message: message,
        });
        await useNotifyUser(admin.id, userId, "verifyRequestRejected", message);
      }
      if (result.success) {
        loadVerificationRequests();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      case "Pending":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };
  
  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Verification Requests</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-950">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Proof Link
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests?.map((request: any, index) => (
              <tr key={request._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {request?.fullName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{request?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      request.status
                    )}`}
                  >
                    {request?.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(request.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={request?.proofLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Proof
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() =>
                      handleAction(request?.userId, request?._id, "accept")
                    }
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleAction(request?.userId, request._id, "reject")
                    }
                    className="text-red-600 hover:text-red-900"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationRequests;
