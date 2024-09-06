import React, { useEffect, useState } from "react";
import { getReports, changeReportStatus } from "../../../API/admin";
import PopUpModal from "../../common/utilies/Modal";

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
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null); // Track the selected report ID

  const fetchPostReports = async () => {
    try {
      const response = await getReports();
      setReports(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAction = async (reportId: string | null, status: string) => {
    if (!reportId) return; // Ensure the reportId is valid
    try {
      await changeReportStatus(reportId, status);
      fetchPostReports(); // Refresh reports after action
      setIsDeleteModalOpen(false); // Close the modal after action
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
    setSelectedReportId(reportId); // Store the selected report ID
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModel = async () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Post Report Requests</h1>
      <div className="bg-white rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-zinc-950 text-gray-200 uppercase tracking-wider text-left text-xs">
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Post Image</th>
                <th className="px-6 py-3 font-medium">Post Caption</th>
                <th className="px-6 py-3 font-medium">Reported By</th>
                <th className="px-6 py-3 font-medium">Report Reason</th>
                <th className="px-6 py-3 font-medium">Post Type</th>
                <th className="px-6 py-3 font-medium">Report Status</th>
                <th className="px-6 py-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report, index) => (
                <tr key={report._id}>
                  <td className="px-6 py-4 text-sm text-gray-500">#{index + 1}</td>
                  <td className="px-6 py-4">
                    {report.postImageUrl ? (
                      <img
                        src={report.postImageUrl}
                        alt="Post"
                        className="w-24 h-24 object-cover rounded-lg"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : (
                      <div className="text-sm text-gray-500">No Image</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 truncate max-w-xs">
                    {report.postCaption || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                    {report.userId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">
                    {report.reportReason}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {report.postType}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        report.reportStatus
                      )}`}
                    >
                      {report.reportStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium">
                    <button
                      onClick={() => handleDeleteModalOpen(report._id)} // Pass report ID
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleAction(report._id, "Reject")}
                      className="text-red-600 hover:text-red-900 mr-2 mt-3"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <PopUpModal
            isOpen={isDeleteModalOpen}
            isClose={handleCloseDeleteModel}
            onConfirm={() => handleAction(selectedReportId, "Delete")} 
            title="Are you sure to delete the post "
            content="delete reported post"// Call delete action with selected report ID
          />
        </div>
      </div>
    </div>
  );
};

export default PostReports;
