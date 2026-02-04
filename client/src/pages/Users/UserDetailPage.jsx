const UserDetailPage = ({ userDetails }) => {
  if (!userDetails) {
    return (
      <div className="bg-white rounded p-4 shadow text-gray-500">
        Select a user to view details
      </div>
    );
  }
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-semibold mb-1 text-purple-900">User Details</h2>
      <p className="text-sm text-purple-500">{userDetails.fullName}</p>
      <p className="text-sm text-purple-500">{userDetails.email}</p>
      <p className="text-sm text-purple-500">
        {userDetails.country || "Unknown"}
      </p>
    </div>
  );
};

export default UserDetailPage;
