import React, { useEffect, useState } from "react";
import { blockUser, getUsers } from "../../../API/admin";
import { User } from "../../../@types/allTypes";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import ReusableTable from "../../common/ReusableTable";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const itemsPerPage = 10;

  const fetchAllUsers = async () => {
    try {
      const users = await getUsers();
      if (!users.length) {
        toast("No users exist!", { icon: "ℹ️", duration: 4000 });
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

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Role", accessor: "role" },
    { Header: "Skills", accessor: "skill" },
    { Header: "Country", accessor: "country" },
    { Header: "Join Date", accessor: "created_at" },
  ];

  return (
    <div className="p-4 bg-gray-100 md:w/2">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ReusableTable
        data={users}
        columns={columns}
        renderActions={(user: User) => (
          <>
            <button
              className={user.blocked ? "text-green-500" : "text-red-500"}
              onClick={() => handleUserBlock(user?._id, user?.blocked)}
            >
              {user.blocked ? "Unblock" : "Block"}
            </button>
          </>
        )}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default UserList;
