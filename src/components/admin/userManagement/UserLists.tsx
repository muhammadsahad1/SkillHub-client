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
          duration: 4000, // Adjust the time the toast stays on the screen (in milliseconds)
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

  const handleUserBlock = async (id: string, currentBlockedStatus: boolean) => {
    const action = currentBlockedStatus ? 'unblock' : 'block';
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
          setUsers(prevUsers => 
            prevUsers.map(user => 
              user._id === id ? { ...user, blocked: !currentBlockedStatus } : user
            )
          );
          toast.success(response.message);
        }
      }
    } catch (error) {
      toast.error(`Failed to ${action} user`);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
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
    <div className="w-full flex justify-center items-center py-8">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <h3 className="font-bold font-poppins text-3xl text-neutral-900 mb-6 text-center">
          User List
        </h3>
        <div className="w-full flex justify-center items-center">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-zinc-950">
              <tr className="text-zinc-200">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Skills</th>
                <th className="py-2 px-4 border-b">Country</th>
                <th className="py-2 px-4 border-b">Join Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center font-semibold">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">{user.skill}</td>
                  <td className="py-2 px-4 border-b">{user.country}</td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(user?.created_at)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user?.status ? "Active" : "Inactive"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      Edit
                    </button>
                    <button
                      className={user.blocked ? "text-green-500" : "text-red-500"}
                      onClick={() => handleUserBlock(user._id,user?.blocked)}
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
