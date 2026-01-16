import React, { useState } from "react";
import UserTable from "./components/UserTable";
import EditUserModal from "./modals/EditUserModal";
import UserDetailPage from "./UserDetailPage";

const UsersPage = () => {
  return (
    <div>
      <UserTable />
      <UserDetailPage />
      {/* <EditUserModal /> */}
    </div>
  );
};

export default UsersPage;
