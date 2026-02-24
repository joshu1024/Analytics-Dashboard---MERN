import { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import UserDetailPage from "./UserDetailPage";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/slices/userSlice.js";
import { useAppDispatch } from "../../store/hooks";
import { User } from "../../types/user";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <UserTable onSelected={(user) => setSelectedUser(user)} />
      <UserDetailPage userDetails={selectedUser} />
      {/* <EditUserModal /> */}
    </div>
  );
};

export default UsersPage;
