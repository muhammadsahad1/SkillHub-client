import { useEffect, useState } from "react";
import { getReports, changeReportStatus } from "../../../API/admin";
import PopUpModal from "../../common/utilies/Modal";
import ReusableTable from "../../common/ReusableTable"; // Import the ReusableTable

interface IReportRequest {
  _id: string;
  postId: string;
  userId: string;
  postCaption: string;
  reportReason: string;
  postType: string;
  reportStatus: string;
  created_at: Date;
  postImageUrl?: string;
}

const PostReports = () => {
  const [reports, setReports] = useState<IReportRequest[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const fetchPostReports = async () => {
    try {
      const response = await getReports();
      setReports(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAction = async (reportId: string | null, status: string) => {
    if (!reportId) return;
    try {
      await changeReportStatus(reportId, status);
      fetchPostReports();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostReports();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeleteModalOpen = (reportId: string) => {
    setSelectedReportId(reportId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModel = async () => {
    setIsDeleteModalOpen(false);
  };

  const columns = [
    { Header: "#", accessor: "index" },
    {
      Header: "Post Image",
      accessor: "postImageUrl",
      Cell: ({ value }: { value?: string }) =>
        value ? (
          <img
            src={value}
            alt="Post"
            className="w-24 h-24 object-cover rounded-lg"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        ) : (
          "No Image"
        ),
    },
    { Header: "Post Caption", accessor: "postCaption" },
    { Header: "Reported By", accessor: "userId" },
    { Header: "Report Reason", accessor: "reportReason" },
    { Header: "Post Type", accessor: "postType" },
    {
      Header: "Report Status",
      accessor: "reportStatus",
      Cell: ({ value }: { value: string }) => (
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
            value
          )}`}
        >
          {value}
        </span>
      ),
    },
  ];

  const renderActions = (report: IReportRequest) => (
    <div>
      <button
        onClick={() => handleDeleteModalOpen(report._id)}
        className="text-indigo-600 hover:text-indigo-900 mr-2"
      >
        Delete
      </button>
      <button
        onClick={() => handleAction(report._id, "Reject")}
        className="text-red-600 hover:text-red-900"
      >
        Reject
      </button>
    </div>
  );

  // Prepare the data to be passed into the ReusableTable
  const formattedData = reports.map((report, index) => ({
    ...report,
    index: index + 1,
  }));

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Post Report Requests</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <ReusableTable
          data={formattedData}
          columns={columns}
          renderActions={renderActions} // Include the action buttons
          itemsPerPage={5}
        />
      </div>

      {/* Delete confirmation modal */}
      <PopUpModal
        isOpen={isDeleteModalOpen}
        isClose={handleCloseDeleteModel}
        onConfirm={() => handleAction(selectedReportId, "Delete")}
        title="Are you sure to delete the post?"
        content="This action will permanently remove the reported post."
      />
    </div>
  );
};

export default PostReports;
