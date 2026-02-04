import { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import UserDetailPage from "./UserDetailPage";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/slices/userSlice.js";

const UsersPage = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <UserTable onSelected={setSelectedUser} />
      <UserDetailPage userDetails={selectedUser} />
      {/* <EditUserModal /> */}
    </div>
  );
};

export default UsersPage;
