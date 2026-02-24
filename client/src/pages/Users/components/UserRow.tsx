import { FC } from "react";
import { useAppDispatch } from "../../../store/hooks.js";
import {
  UpdateUserRole,
  UpdateUserStatus,
} from "../../../store/slices/userSlice.js";
import { User } from "../../../types/user.js";
import RoleSelect from "./RoleSelect.jsx";
import UserStatusToggle from "./UserStatusToggle.jsx";
import { useDispatch } from "react-redux";


interface Props{
   onSelected:(user:User)=>void,
    user:User
}
const UserRow:FC<Props> = ({ user, onSelected }) => {
  const dispatch = useAppDispatch();

  return (
    <tr
      onClick={() => onSelected?.(user)}
      className="cursor-pointer hover:bg-gray-50"
    >
      <td className="px-4 py-2 text-left">{user.fullName}</td>
      <td className="px-4 py-2 text-left">{user.email}</td>
      <td className="px-4 py-2 capitalize text-left">{user.role}</td>
      <td className="px-4 py-2 text-left" onClick={(e) => e.stopPropagation()}>
        <RoleSelect
          value={user.role}
          onChange={(role:string) =>
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
