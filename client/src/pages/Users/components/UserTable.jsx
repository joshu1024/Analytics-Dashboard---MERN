import UserRow from "./UserRow";
const users = [
  { id: 1, name: "Joe", email: "joekipamet@gmail.com", role: "Admin" },
  { id: 2, name: "Kip", email: "kip@gmail.com", role: "user" },
];
const UserTable = () => (
  <table className="bg-white w-full text-sm rounded">
    <thead>
      <tr>
        <th>User</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u, i) => (
        <UserRow key={i} user={u} />
      ))}
    </tbody>
  </table>
);

export default UserTable;
