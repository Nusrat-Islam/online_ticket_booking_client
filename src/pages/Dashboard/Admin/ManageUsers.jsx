import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";


const ManageUsers = () => {
  const {user} = useAuth()

  const axiosSecure = useAxiosSecure()
  const {
     data: users = [],
     isLoading,
     refetch,
  }= useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const result = await axiosSecure('/users')
      return result.data
    }
  })
  console.log(users)

    // 👉 role change
  const handleChangeRole = async (id, role) => {
    await axiosSecure.patch(`/users/role/${id}`, { role });
    refetch(); // table auto refresh
  };

  // 👉 mark fraud
  const handleMarkFraud = async (id) => {
    await axiosSecure.patch(`/users/fraud/${id}`);
    refetch();
  };
//unfraud
  const handleUnFraud = async (id) => {
  await axiosSecure.patch(`/users/unfraud/${id}`);
  refetch();
};


  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
              <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user?._id} className="border-b hover:bg-gray-100">
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td className="capitalize">{user.role}</td>
            <td className="space-x-2">
  {/* Make User (যদি already user না হয়) */}
  {user.role !== "user" && (
    <button
      onClick={() => handleChangeRole(user._id, "user")}
      className="bg-blue-500 px-3 py-1 text-white rounded"
    >
      Make User
    </button>
  )}

  {/* Make Admin (যদি already admin না হয়) */}
  {user.role !== "admin" && (
    <button
      onClick={() => handleChangeRole(user._id, "admin")}
      className="bg-green-500 px-3 py-1 text-white rounded"
    >
      Make Admin
    </button>
  )}

  {/* Make Vendor (যদি already vendor না হয়) */}
  {user.role !== "vendor" && (
    <button
      onClick={() => handleChangeRole(user._id, "vendor")}
      className="bg-yellow-500 px-3 py-1 text-white rounded"
    >
      Make Vendor
    </button>
  )}

  {/* Fraud only for vendor */}
  {/* Vendor Fraud / Unfraud */}
{user.role === "vendor" && user.isFraud ? (
  <button
    onClick={() => handleUnFraud(user._id)}
    className="bg-gray-500 px-3 py-1 text-white rounded"
  >
    Remove Fraud
  </button>
) : (
  user.role === "vendor" && (
    <button
      onClick={() => handleMarkFraud(user._id)}
      className="bg-red-500 px-3 py-1 text-white rounded"
    >
      Mark as Fraud
    </button>
  )
)}

</td>


            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-6">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
