import{ FC} from "react";
import { fetchUser } from "../../../store/slices/userSlice.js";
import UserRow from "./UserRow.jsx";
import {  useAppSelector } from "../../../store/index.js";
import { useAppDispatch } from "../../../store/hooks.js";
import { User } from "../../../types/user";

interface Props{
  onSelected:(user:User)=>void
}
const UserTable:FC<Props> = ({ onSelected }) => {
  const dispatch = useAppDispatch();
  const {
    users = [],
    page,
    totalPages,
    loading,
    error,
  } = useAppSelector((state) => state.user);

  function handleUserTable(page:number) {
    dispatch(fetchUser({page:1,limit:5}));
  }

  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white rounded shadow overflow-hidden relative">
      {loading && (
        <div className="absolute top-20 right-100 text-5xl rounded-full border-4 border-gray-400 w-20 h-20 animate-spin border-t-0"></div>
      )}
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-b">User</th>
            <th className="text-left px-4 py-2 border-b">Email</th>
            <th className="text-left px-4 py-2 border-b">Current Role</th>
            <th className="text-left px-4 py-2 border-b">Change Role</th>
            <th className="text-left px-4 py-2 border-b">Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <UserRow key={u._id} user={u} onSelected={onSelected} />
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 mx-5">
        <button
          disabled={page === 1}
          onClick={() => handleUserTable(page - 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">{`${page} of ${totalPages}`}</span>
        <button
          disabled={page === totalPages}
          onClick={() => handleUserTable(page + 1)}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
