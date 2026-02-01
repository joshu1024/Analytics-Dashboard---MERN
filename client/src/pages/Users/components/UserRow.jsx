import React from "react";

const UserRow = ({ user }) => (
  <tr className="text-left">
    <td>{user.fullName}</td>
    <td>{user.email}</td>
    <td>{user.role}</td>
  </tr>
);

export default UserRow;
