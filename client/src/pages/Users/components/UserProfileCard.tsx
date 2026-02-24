import { FC } from "react";
import { User } from "../../../types/user";

interface UserProfileCardProps {
  user: User | null;
}

const UserProfileCard:FC<UserProfileCardProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="text-gray-500 text-center py-6">
        Select a user to view details
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">{user.fullName}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Country:</strong> {user.country}
        </p>
        <p>
          <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
        </p>
        <p>
          <strong>Last Login:</strong>  {user.lastLogin
          ? new Date(user.lastLogin).toLocaleDateString()
          : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;
