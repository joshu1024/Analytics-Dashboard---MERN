
import { UserActivity } from "../../../types/user";
import { FC } from "react";

interface UserActivityListProps {
  activities?: UserActivity[];
}

const UserActivityList:FC<UserActivityListProps> = ({ activities = [] }) => {
  if (!activities.length) {
    return <p className="text-sm text-gray-500">No recent activity</p>;
  }

  return (
    <ul className="space-y-2 text-sm">
      {activities.map((activity, index) => (
        <li key={index} className="border-b pb-2">
          <p className="font-medium">{activity.action}</p>
          <p className="text-gray-500">{activity.date}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserActivityList;
