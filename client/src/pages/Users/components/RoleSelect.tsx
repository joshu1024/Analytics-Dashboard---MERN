 import { FC } from "react";

interface RoleSelectProps {
  value: string;
  onChange: (role: string) => void;
  disabled?: boolean;
}
const RoleSelect:FC<RoleSelectProps> = ({ value, onChange, disabled }) => {
 
  return (
    <select
      value={value}
      disabled={disabled}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-2 py-1 text-sm bg-white"
    >
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
  );
};

export default RoleSelect;
