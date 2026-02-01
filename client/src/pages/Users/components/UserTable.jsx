import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../../store/slices/userSlice.js";
import UserRow from "./UserRow";

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-b">User</th>
            <th className="text-left px-4 py-2 border-b">Email</th>
            <th className="text-left px-4 py-2 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <UserRow key={u._id || u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
