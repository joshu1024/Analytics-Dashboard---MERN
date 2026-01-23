import { useSelector } from "react-redux";

const RecentActivityFeed = () => {
  const { recentActivity = [], loading } = useSelector(
    (state) => state.dashboard,
  );

  if (loading) return <p>Loading...</p>;
  const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);

    if (isNaN(past.getTime())) return "just now";

    let diff = Math.floor((now - past) / 1000);

    // ✅ handle future dates
    if (diff < 0) diff = Math.abs(diff);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (diff < 60) return `${diff}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="font-semibold mb-3">Recent Activity</h2>
      <ul className="space-y-2 text-sm">
        {recentActivity.map((a, index) => (
          <li key={index} className="flex justify-between">
            <span>{a.message}</span>
            <span className="text-gray-400 text-xs">{timeAgo(a.time)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityFeed;
