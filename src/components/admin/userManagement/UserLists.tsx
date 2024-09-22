import React, { useEffect, useState } from "react";
import { blockUser, getUsers } from "../../../API/admin";
import { User } from "../../../@types/allTypes";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchAllUsers = async () => {
    try {
      const users = await getUsers();
      if (!users.length) {
        toast("No users exist!", {
          icon: "ℹ️",
          duration: 4000,
        });
      } else {
        setUsers(users);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleUserBlock = async (
    id: string | undefined,
    currentBlockedStatus: boolean | undefined
  ) => {
    const action = currentBlockedStatus ? "unblock" : "block";
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are ${action}ing this user!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${action} it!`,
      });

      if (result.isConfirmed) {
        const response = await blockUser(id);
        if (response.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user: User) =>
              user._id === id
                ? { ...user, blocked: !currentBlockedStatus }
                : user
            )
          );
          toast.success(response.message);
        }
      }
    } catch (error) {
      toast.error(`Failed to ${action} user`);
    }
  };

  const formatDate = (dateString: string | undefined): string => {
    const date = new Date(dateString as string);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 bg-gray-100 md:w/2">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Add the table inside a scrollable div for smaller screens */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-zinc-950">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider hidden lg:table-cell">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider hidden lg:table-cell">
                  Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider hidden xl:table-cell">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider hidden xl:table-cell">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-200 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user: User) => (
                <tr key={user?._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {user?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                    {user?.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                    {user?.skill}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden xl:table-cell">
                    {user?.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden xl:table-cell">
                    {formatDate(user?.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-500 text-white">
                      {user?.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                      Edit
                    </button>
                    <button
                      className={
                        user.blocked ? "text-green-500" : "text-red-500"
                      }
                      onClick={() => handleUserBlock(user?._id, user?.blocked)}
                    >
                      {user.blocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
