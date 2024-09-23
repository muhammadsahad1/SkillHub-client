// src/components/admin/common/ReusableTable.tsx
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
          <p>No reports </p>
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
                  >
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
                      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                        column.accessor === "description"
                          ? "max-w-xs truncate"
                          : ""
                      }`}
                      style={
                        column.accessor === "description"
                          ? { maxWidth: "200px", wordWrap: "break-word" }
                          : {}
                      }
                    >
                      {item[column.accessor]}
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
