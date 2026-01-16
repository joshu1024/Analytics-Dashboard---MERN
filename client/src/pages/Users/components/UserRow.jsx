import React from "react";

const UserRow = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.role}</td>
  </tr>
);

export default UserRow;
