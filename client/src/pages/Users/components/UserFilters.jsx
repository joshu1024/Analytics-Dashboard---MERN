const UserFilters = ({ search, setSearch, role, setRole }) => {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 text-sm w-64"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border rounded px-3 py-2 text-sm"
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
  );
};

export default UserFilters;
