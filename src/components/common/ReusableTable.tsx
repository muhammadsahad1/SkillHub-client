import React, { useState } from "react";

interface Column {
  Header: string;
  accessor: string;
}

interface ReusableTableProps {
  data: any[];
  columns: Column[];
  renderActions: (item: any) => React.ReactNode;
  itemsPerPage: number;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  data,
  columns,
  renderActions,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto">
      {data.length <= 0 ? (
        <div className="flex justify-center items-center">
          <p>No reports</p>
        </div>
      ) : (
        <>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-zinc-950">
                {columns.map((column) => (
                  <th
                    key={column.accessor}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                    style={
                      column.accessor === "description"
                        ? { width: "300px" } // Set width for description column
                        : {}
                    }>
                    {column.Header}
                  </th>
                ))}
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((item) => (
                <tr key={item._id}>
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className={`px-6 py-4 text-sm text-gray-500 ${column.accessor === "description" ? "max-w-xs" : ""
                        }`}
                      style={
                        column.accessor === "description"
                          ? {
                            maxWidth: "300px", // Max width for description column
                            minWidth: "200px", // Min width to ensure no overlap
                            whiteSpace: "normal", // Ensure text wraps to new lines
                            overflow: "hidden",
                            textOverflow: "ellipsis", // Cut off overflow text
                          }
                          : {}
                      }
                    >
                      {column.accessor === "description" ? (
                        <>
                          <div className="description-wrapper">
                            {expandedRows[item._id]
                              ? item.description // Show full description when expanded
                              : `${item.description.slice(0, 100)}...`} {/* Truncated after 100 characters */}
                          </div>
                          <button
                            onClick={() => toggleRowExpansion(item._id)}
                            className="text-blue-500 hover:underline"
                          >
                            {expandedRows[item._id] ? "Show Less" : "View More"}
                          </button>
                        </>
                      ) : (
                        item[column.accessor]
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {renderActions(item)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReusableTable;
