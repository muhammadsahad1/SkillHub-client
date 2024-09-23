import { useEffect, useState } from "react";
import { IEventRequets } from "../../../@types/eventRequests";
import { changeEventStatus, getEvents } from "../../../API/admin";
import ReusableTable from "../../common/ReusableTable";

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
      await changeEventStatus(requestId, action);

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, approvalStatus: action }
            : request
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEventRequests();
  }, []);

  const columns = [
    { Header: "#", accessor: "index" },
    { Header: "Event Name", accessor: "title" },
    { Header: "Organizer", accessor: "userName" },
    { Header: "Description", accessor: "description" },
    { Header: "Date", accessor: "date" },
    { Header: "Time", accessor: "time" },
    { Header: "Duration", accessor: "duration" },
    { Header: "Category", accessor: "category" },
    { Header: "Approval Status", accessor: "approvalStatus" },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800"; // Add specific styling for 'Completed'
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderActions = (item: IEventRequets) => (
    <div>
      {item.eventStatus === "Completed" ? (
        <span className="text-gray-400">No Actions (Completed)</span>
      ) : (
        <>
          <button
            onClick={() => handleAction(item._id, "Accept")}
            className="text-indigo-600 hover:text-indigo-900 mr-2"
          >
            Approve
          </button>
          <button
            onClick={() => handleAction(item._id, "Reject")}
            className="text-red-600 hover:text-red-900"
          >
            Reject
          </button>
        </>
      )}
    </div>
  );

  // Format the date and approval status before passing to the table
  const formattedData = requests.map((request, index) => ({
    ...request,
    index: index + 1,
    date: new Date(request.date).toLocaleDateString(),
    approvalStatus: (
      <span
        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
          request.approvalStatus
        )}`}
      >
        {request.approvalStatus}
      </span>
    ),
  }));

  return (
    <div className="p-4 bg-gray-100 ">
      <h1 className="text-2xl font-bold mb-4">Event Approval Requests</h1>
      <ReusableTable
        data={formattedData}
        columns={columns}
        renderActions={renderActions}
        itemsPerPage={5}
      />
    </div>
  );
};

export default EventsRequestsComponent;
