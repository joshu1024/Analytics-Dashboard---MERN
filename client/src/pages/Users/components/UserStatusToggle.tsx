import { FC } from "react";

interface UserStatusToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

const UserStatusToggle:FC<UserStatusToggleProps> = ({ isActive, onToggle }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`px-3 py-1 rounded text-xs font-medium ${
        isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </button>
  );
};

export default UserStatusToggle;
