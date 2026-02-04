import {
  UpdateUserRole,
  UpdateUserStatus,
} from "../../../store/slices/userSlice.js";
import RoleSelect from "./RoleSelect";
import UserStatusToggle from "./UserStatusToggle";
import { useDispatch } from "react-redux";

const UserRow = ({ user, onSelected }) => {
  const dispatch = useDispatch();

  return (
    <tr
      onClick={() => onSelected?.(user)}
      className="cursor-pointer hover:bg-gray-50"
    >
      <td className="px-4 py-2 text-left">{user.fullName}</td>
      <td className="px-4 py-2 text-left">{user.email}</td>
      <td className="px-4 py-2 capitalize text-left">{user.role}</td>
      <td className="px-4 py-2 text-left" onClick={(e) => e.stopPropagation(e)}>
        <RoleSelect
          value={user.role}
          onChange={(role) =>
            dispatch(UpdateUserRole({ userId: user._id, role }))
          }
        />
      </td>
      <td className="px-4 py-2 text-left">
        <UserStatusToggle
          isActive={user.isActive}
          onToggle={() => dispatch(UpdateUserStatus(user._id))}
        />
      </td>
    </tr>
  );
};

export default UserRow;
