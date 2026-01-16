import React from "react";

const RecentActivityFeed = () => {
  const activities = [
    { id: 1, action: "User Logged In", time: "2 mins  age" },
    { id: 2, action: "Company created", time: "1 hour ago" },
    { id: 3, action: "Subscription upgraded", time: "Yesterday" },
  ]; // Example activities
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-3">Recent Activity</h2>
      <ul className="space-y-2 text-sm">
        {activities.map((a) => (
          <li key={a.id}>
            <span>{a.action}</span>
            <span className="text-gray-400">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityFeed;
