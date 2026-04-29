import { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import UserDetailPage from "./UserDetailPage";
import { fetchUser } from "../../store/slices/userSlice.js";
import { useAppDispatch } from "../../store/hooks";
import { User } from "../../types/user";
import { useAppSelector } from "../../store";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { loading, error ,users} = useAppSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(fetchUser({page:1,limit:5}));
  }, []);

  if (loading && !users.length) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <UserTable onSelected={(user) => setSelectedUser(user)} />
      <UserDetailPage userDetails={selectedUser} />
    </div>
  );
};

export default UsersPage;
