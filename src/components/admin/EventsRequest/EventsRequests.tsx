import React, { useEffect, useState } from "react";
import { IEventRequets } from "../../../@types/eventRequests";
import { changeEventStatus, getEvents } from "../../../API/admin";

const EventsRequestsComponent = () => {
  const [requests, setRequests] = useState<IEventRequets[]>([]);
  const fetchEventRequests = async () => {
    try {
      const response = await getEvents();
      setRequests(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAction = async (requestId: string, status: string) => {
    try {
      const action = status === "Accept" ? "Approved" : "Rejected";
      const result = await changeEventStatus(requestId, action);
      if (result.success) {
        fetchEventRequests();
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchEventRequests();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  console.log(requests);

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Event Approval Requests</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-zinc-950">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Event Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Organizer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                Approval Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-200 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request, index) => (
              <tr key={request._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {request.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {request?.userName || "Unknown"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(request.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.duration} hours
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.category || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                      request.approvalStatus
                    )}`}
                  >
                    {request.approvalStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleAction(request._id, "Accept")}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(request._id, "Reject")}
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

export default EventsRequestsComponent;
